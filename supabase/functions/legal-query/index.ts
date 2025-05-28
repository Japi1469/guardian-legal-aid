import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { Configuration, OpenAIApi } from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LegalResponse {
  answer: string;
  actions: string[];
  sources: { title: string; url: string; }[];
  jurisdiction: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    // Initialize Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Determine jurisdiction from query
    const isCanadian = query.toLowerCase().includes('canada') || 
                      query.toLowerCase().includes('ontario') || 
                      query.toLowerCase().includes('provincial');
    const jurisdiction = isCanadian ? 'Canada' : 'US';

    // Query the legal database with jurisdiction filter
    const { data: legalDocs, error } = await supabaseClient
      .from('legal_resources')
      .select('*')
      .eq('jurisdiction', jurisdiction)
      .textSearch('fts', query.replace(/[^\w\s]/g, ' '));

    if (error) throw error;

    // Generate response using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a legal information assistant specializing in ${jurisdiction} law. Provide accurate information based on jurisdiction-specific legal resources. Always include possible courses of action and relevant sources. DO NOT provide specific legal advice, only general information and guidance.`
        },
        {
          role: "user",
          content: `Query: ${query}\nRelevant legal documents: ${JSON.stringify(legalDocs)}`
        }
      ]
    });

    // Extract recommended actions from the response
    const answer = completion.choices[0].message.content;
    const actionRegex = /(?:You can|You should|Steps to take|Consider):\s*(?:\d\.\s*|\-\s*)?([^\n]+)/g;
    const actions = [...answer.matchAll(actionRegex)].map(match => match[1]);

    const response: LegalResponse = {
      answer,
      actions,
      sources: legalDocs.map(doc => ({
        title: doc.title,
        url: doc.url
      })),
      jurisdiction
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process legal query' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});