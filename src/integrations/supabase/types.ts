export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      artists: {
        Row: {
          banner_url: string | null
          bio: string
          created_at: string
          full_bio: string | null
          genre: string
          id: string
          is_active: boolean | null
          main_video_url: string | null
          name: string
          photo_url: string | null
          press_kit_url: string | null
          slug: string
          social_links: Json | null
          updated_at: string
          whatsapp_number: string
        }
        Insert: {
          banner_url?: string | null
          bio: string
          created_at?: string
          full_bio?: string | null
          genre: string
          id?: string
          is_active?: boolean | null
          main_video_url?: string | null
          name: string
          photo_url?: string | null
          press_kit_url?: string | null
          slug: string
          social_links?: Json | null
          updated_at?: string
          whatsapp_number: string
        }
        Update: {
          banner_url?: string | null
          bio?: string
          created_at?: string
          full_bio?: string | null
          genre?: string
          id?: string
          is_active?: boolean | null
          main_video_url?: string | null
          name?: string
          photo_url?: string | null
          press_kit_url?: string | null
          slug?: string
          social_links?: Json | null
          updated_at?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
      button_clicks: {
        Row: {
          artist_id: string
          button_type: string
          clicked_at: string
          id: string
        }
        Insert: {
          artist_id: string
          button_type: string
          clicked_at?: string
          id?: string
        }
        Update: {
          artist_id?: string
          button_type?: string
          clicked_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "button_clicks_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "button_clicks_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists_public"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          artist_id: string | null
          created_at: string
          email: string | null
          event_city: string | null
          event_date: string | null
          id: string
          message: string | null
          name: string | null
          phone: string | null
          status: string | null
        }
        Insert: {
          artist_id?: string | null
          created_at?: string
          email?: string | null
          event_city?: string | null
          event_date?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          status?: string | null
        }
        Update: {
          artist_id?: string | null
          created_at?: string
          email?: string | null
          event_city?: string | null
          event_date?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists_public"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          artist_id: string
          id: string
          referrer: string | null
          user_agent: string | null
          viewed_at: string
        }
        Insert: {
          artist_id: string
          id?: string
          referrer?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Update: {
          artist_id?: string
          id?: string
          referrer?: string | null
          user_agent?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_views_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_views_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists_public"
            referencedColumns: ["id"]
          },
        ]
      }
      photos: {
        Row: {
          artist_id: string
          caption: string | null
          created_at: string
          id: string
          sort_order: number | null
          url: string
        }
        Insert: {
          artist_id: string
          caption?: string | null
          created_at?: string
          id?: string
          sort_order?: number | null
          url: string
        }
        Update: {
          artist_id?: string
          caption?: string | null
          created_at?: string
          id?: string
          sort_order?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "photos_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists_public"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          artist_id: string
          created_at: string
          description: string
          duration: string | null
          id: string
          name: string
          photos: string[] | null
          repertoire: string[] | null
          sort_order: number | null
          technical_info: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          artist_id: string
          created_at?: string
          description: string
          duration?: string | null
          id?: string
          name: string
          photos?: string[] | null
          repertoire?: string[] | null
          sort_order?: number | null
          technical_info?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          artist_id?: string
          created_at?: string
          description?: string
          duration?: string | null
          id?: string
          name?: string
          photos?: string[] | null
          repertoire?: string[] | null
          sort_order?: number | null
          technical_info?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists_public"
            referencedColumns: ["id"]
          },
        ]
      }
      shows: {
        Row: {
          artist_id: string
          city: string
          created_at: string
          date: string
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["show_status"]
          updated_at: string
          venue: string
        }
        Insert: {
          artist_id: string
          city: string
          created_at?: string
          date: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["show_status"]
          updated_at?: string
          venue: string
        }
        Update: {
          artist_id?: string
          city?: string
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["show_status"]
          updated_at?: string
          venue?: string
        }
        Relationships: [
          {
            foreignKeyName: "shows_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shows_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists_public"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          artist_id: string
          created_at: string
          id: string
          name: string
          photo_url: string | null
          role: string
          text: string
        }
        Insert: {
          artist_id: string
          created_at?: string
          id?: string
          name: string
          photo_url?: string | null
          role: string
          text: string
        }
        Update: {
          artist_id?: string
          created_at?: string
          id?: string
          name?: string
          photo_url?: string | null
          role?: string
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists_public"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          artist_id: string
          created_at: string
          id: string
          sort_order: number | null
          title: string | null
          url: string
        }
        Insert: {
          artist_id: string
          created_at?: string
          id?: string
          sort_order?: number | null
          title?: string | null
          url: string
        }
        Update: {
          artist_id?: string
          created_at?: string
          id?: string
          sort_order?: number | null
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists_public"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      artists_public: {
        Row: {
          banner_url: string | null
          bio: string | null
          created_at: string | null
          full_bio: string | null
          genre: string | null
          id: string | null
          is_active: boolean | null
          main_video_url: string | null
          name: string | null
          photo_url: string | null
          press_kit_url: string | null
          slug: string | null
          social_links: Json | null
          updated_at: string | null
        }
        Insert: {
          banner_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_bio?: string | null
          genre?: string | null
          id?: string | null
          is_active?: boolean | null
          main_video_url?: string | null
          name?: string | null
          photo_url?: string | null
          press_kit_url?: string | null
          slug?: string | null
          social_links?: Json | null
          updated_at?: string | null
        }
        Update: {
          banner_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_bio?: string | null
          genre?: string | null
          id?: string | null
          is_active?: boolean | null
          main_video_url?: string | null
          name?: string | null
          photo_url?: string | null
          press_kit_url?: string | null
          slug?: string | null
          social_links?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      show_status: "confirmed" | "available" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      show_status: ["confirmed", "available", "pending"],
    },
  },
} as const
