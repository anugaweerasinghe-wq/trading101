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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      duels: {
        Row: {
          code: string
          created_at: string
          creator_id: string
          creator_start_value: number
          ends_at: string
          id: string
          opponent_id: string | null
          opponent_start_value: number | null
          starts_at: string
          status: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          creator_id: string
          creator_start_value?: number
          ends_at?: string
          id?: string
          opponent_id?: string | null
          opponent_start_value?: number | null
          starts_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          creator_id?: string
          creator_start_value?: number
          ends_at?: string
          id?: string
          opponent_id?: string | null
          opponent_start_value?: number | null
          starts_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      market_articles: {
        Row: {
          content: string
          created_at: string
          focus_asset: string
          id: string
          sentiment: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          focus_asset: string
          id?: string
          sentiment?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          focus_asset?: string
          id?: string
          sentiment?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          country: string | null
          created_at: string
          id: string
          is_public: boolean
          updated_at: string
          username: string
        }
        Insert: {
          bio?: string | null
          country?: string | null
          created_at?: string
          id: string
          is_public?: boolean
          updated_at?: string
          username: string
        }
        Update: {
          bio?: string | null
          country?: string | null
          created_at?: string
          id?: string
          is_public?: boolean
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string
          created_at: string
          id: string
          ip_hash: string
          is_featured: boolean
          is_visible: boolean
          name: string | null
          rating: number
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          ip_hash: string
          is_featured?: boolean
          is_visible?: boolean
          name?: string | null
          rating?: number
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          ip_hash?: string
          is_featured?: boolean
          is_visible?: boolean
          name?: string | null
          rating?: number
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          email: string
          id: string
          source: string | null
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          source?: string | null
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          source?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
      trader_stats: {
        Row: {
          badges: number
          created_at: string
          max_drawdown: number
          pnl_pct: number
          portfolio_value: number
          trades: number
          updated_at: string
          user_id: string
          win_rate: number
        }
        Insert: {
          badges?: number
          created_at?: string
          max_drawdown?: number
          pnl_pct?: number
          portfolio_value?: number
          trades?: number
          updated_at?: string
          user_id: string
          win_rate?: number
        }
        Update: {
          badges?: number
          created_at?: string
          max_drawdown?: number
          pnl_pct?: number
          portfolio_value?: number
          trades?: number
          updated_at?: string
          user_id?: string
          win_rate?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
