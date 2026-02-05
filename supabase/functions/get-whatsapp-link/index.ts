import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { artistId, artistName } = await req.json();

    if (!artistId) {
      return new Response(
        JSON.stringify({ error: "artistId is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: artist, error } = await supabaseAdmin
      .from("artists")
      .select("whatsapp_number, name")
      .eq("id", artistId)
      .eq("is_active", true)
      .single();

    if (error || !artist) {
      return new Response(
        JSON.stringify({ error: "Artist not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const name = artistName || artist.name;
    const message = encodeURIComponent(
      `Olá! Gostaria de informações sobre contratação do show de ${name}.`
    );
    const whatsappLink = `https://wa.me/${artist.whatsapp_number}?text=${message}`;

    return new Response(
      JSON.stringify({ link: whatsappLink }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
