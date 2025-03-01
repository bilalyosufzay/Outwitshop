export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_conversations: {
        Row: {
          created_at: string | null
          id: string
          message: string
          response: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          response: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          response?: string
          user_id?: string | null
        }
        Relationships: []
      }
      external_products: {
        Row: {
          affiliate_link: string
          created_at: string | null
          id: string
          image: string
          name: string
          price: number
          source: string
        }
        Insert: {
          affiliate_link: string
          created_at?: string | null
          id?: string
          image: string
          name: string
          price: number
          source: string
        }
        Update: {
          affiliate_link?: string
          created_at?: string | null
          id?: string
          image?: string
          name?: string
          price?: number
          source?: string
        }
        Relationships: []
      }
      lucky_draw_campaigns: {
        Row: {
          config: Json | null
          created_at: string | null
          description: string | null
          end_date: string
          entry_methods: Json | null
          id: string
          name: string
          start_date: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          description?: string | null
          end_date: string
          entry_methods?: Json | null
          id?: string
          name: string
          start_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          description?: string | null
          end_date?: string
          entry_methods?: Json | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      lucky_draw_completed_missions: {
        Row: {
          completed_at: string | null
          entries_awarded: number
          id: string
          mission_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          entries_awarded?: number
          id?: string
          mission_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          entries_awarded?: number
          id?: string
          mission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lucky_draw_completed_missions_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "lucky_draw_missions"
            referencedColumns: ["id"]
          },
        ]
      }
      lucky_draw_entries: {
        Row: {
          campaign_id: string
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          is_used: boolean | null
          method: string
          quantity: number
          reference_id: string | null
          user_id: string
        }
        Insert: {
          campaign_id: string
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          is_used?: boolean | null
          method: string
          quantity?: number
          reference_id?: string | null
          user_id: string
        }
        Update: {
          campaign_id?: string
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          is_used?: boolean | null
          method?: string
          quantity?: number
          reference_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lucky_draw_entries_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "lucky_draw_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      lucky_draw_missions: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          reward: number
          title: string
          type: string
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          reward?: number
          title: string
          type: string
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          reward?: number
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lucky_draw_missions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "lucky_draw_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      lucky_draw_prizes: {
        Row: {
          campaign_id: string
          claimed: number | null
          color: string
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          name: string
          points: number | null
          quantity: number
          rarity: string | null
        }
        Insert: {
          campaign_id: string
          claimed?: number | null
          color?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name: string
          points?: number | null
          quantity?: number
          rarity?: string | null
        }
        Update: {
          campaign_id?: string
          claimed?: number | null
          color?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          name?: string
          points?: number | null
          quantity?: number
          rarity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lucky_draw_prizes_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "lucky_draw_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      lucky_draw_winners: {
        Row: {
          campaign_id: string
          claim_code: string | null
          claimed: boolean | null
          claimed_at: string | null
          date: string | null
          entry_id: string
          expires_at: string | null
          id: string
          is_published: boolean | null
          prize_id: string
          user_id: string
        }
        Insert: {
          campaign_id: string
          claim_code?: string | null
          claimed?: boolean | null
          claimed_at?: string | null
          date?: string | null
          entry_id: string
          expires_at?: string | null
          id?: string
          is_published?: boolean | null
          prize_id: string
          user_id: string
        }
        Update: {
          campaign_id?: string
          claim_code?: string | null
          claimed?: boolean | null
          claimed_at?: string | null
          date?: string | null
          entry_id?: string
          expires_at?: string | null
          id?: string
          is_published?: boolean | null
          prize_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lucky_draw_winners_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "lucky_draw_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lucky_draw_winners_entry_id_fkey"
            columns: ["entry_id"]
            isOneToOne: false
            referencedRelation: "lucky_draw_entries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lucky_draw_winners_prize_id_fkey"
            columns: ["prize_id"]
            isOneToOne: false
            referencedRelation: "lucky_draw_prizes"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_products: {
        Row: {
          category: string
          commission_rate: number | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          image: string
          images: string[] | null
          name: string
          on_sale: boolean | null
          original_price: number | null
          price: number
          seller_id: string
          shop_id: string
          status: string | null
          trending: boolean | null
          updated_at: string | null
        }
        Insert: {
          category: string
          commission_rate?: number | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          image: string
          images?: string[] | null
          name: string
          on_sale?: boolean | null
          original_price?: number | null
          price: number
          seller_id: string
          shop_id: string
          status?: string | null
          trending?: boolean | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          commission_rate?: number | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          image?: string
          images?: string[] | null
          name?: string
          on_sale?: boolean | null
          original_price?: number | null
          price?: number
          seller_id?: string
          shop_id?: string
          status?: string | null
          trending?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_shop"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
          shop_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
          shop_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
          shop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_id: string
          created_at: string | null
          id: string
          shop_id: string
          status: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          buyer_id: string
          created_at?: string | null
          id?: string
          shop_id: string
          status?: string
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          buyer_id?: string
          created_at?: string | null
          id?: string
          shop_id?: string
          status?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      poll_votes: {
        Row: {
          created_at: string | null
          id: string
          option_id: string
          poll_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          option_id: string
          poll_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          option_id?: string
          poll_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "poll_votes_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          creator_id: string | null
          description: string | null
          end_date: string | null
          id: string
          options: Json
          start_date: string | null
          status: string | null
          title: string
        }
        Insert: {
          creator_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          options: Json
          start_date?: string | null
          status?: string | null
          title: string
        }
        Update: {
          creator_id?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          options?: Json
          start_date?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      product_views: {
        Row: {
          id: string
          product_id: string
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: string
          product_id: string
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          affiliate_link: string | null
          category: string | null
          created_at: string | null
          description: string | null
          dimensions: Json | null
          features: string[] | null
          id: string
          images: string[] | null
          name: string
          price: number
          shipping_info: Json | null
          shop_id: string
          sku: string | null
          source: string | null
          specifications: Json[] | null
          status: string
          stock_quantity: number
          subcategory: string | null
          updated_at: string | null
          video_url: string | null
          weight: number | null
        }
        Insert: {
          affiliate_link?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          name: string
          price: number
          shipping_info?: Json | null
          shop_id: string
          sku?: string | null
          source?: string | null
          specifications?: Json[] | null
          status?: string
          stock_quantity?: number
          subcategory?: string | null
          updated_at?: string | null
          video_url?: string | null
          weight?: number | null
        }
        Update: {
          affiliate_link?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          name?: string
          price?: number
          shipping_info?: Json | null
          shop_id?: string
          sku?: string | null
          source?: string | null
          specifications?: Json[] | null
          status?: string
          stock_quantity?: number
          subcategory?: string | null
          updated_at?: string | null
          video_url?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          followers_count: number | null
          following_count: number | null
          id: string
          social_links: Json | null
          updated_at: string | null
          username: string | null
          wishlist_public: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          followers_count?: number | null
          following_count?: number | null
          id: string
          social_links?: Json | null
          updated_at?: string | null
          username?: string | null
          wishlist_public?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          followers_count?: number | null
          following_count?: number | null
          id?: string
          social_links?: Json | null
          updated_at?: string | null
          username?: string | null
          wishlist_public?: boolean | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          answer: string | null
          answered_at: string | null
          asker_id: string | null
          created_at: string | null
          id: string
          question: string
          seller_id: string | null
          status: string | null
        }
        Insert: {
          answer?: string | null
          answered_at?: string | null
          asker_id?: string | null
          created_at?: string | null
          id?: string
          question: string
          seller_id?: string | null
          status?: string | null
        }
        Update: {
          answer?: string | null
          answered_at?: string | null
          asker_id?: string | null
          created_at?: string | null
          id?: string
          question?: string
          seller_id?: string | null
          status?: string | null
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string | null
          id: string
          referrals_count: number | null
          rewards_earned: number | null
          type: string
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          referrals_count?: number | null
          rewards_earned?: number | null
          type: string
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          referrals_count?: number | null
          rewards_earned?: number | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      shops: {
        Row: {
          address: string
          business_license: string | null
          contact_email: string
          created_at: string
          description: string | null
          id: string
          id_card_number: string
          name: string
          owner_id: string
          owner_name: string
          phone_number: string
          slug: string
          status: string
          updated_at: string | null
          verification_details: Json | null
          verification_documents: Json | null
          verification_rejected_reason: string | null
          verification_status: string | null
          verification_submitted_at: string | null
          verified: boolean | null
        }
        Insert: {
          address: string
          business_license?: string | null
          contact_email: string
          created_at?: string
          description?: string | null
          id?: string
          id_card_number: string
          name: string
          owner_id: string
          owner_name: string
          phone_number: string
          slug: string
          status?: string
          updated_at?: string | null
          verification_details?: Json | null
          verification_documents?: Json | null
          verification_rejected_reason?: string | null
          verification_status?: string | null
          verification_submitted_at?: string | null
          verified?: boolean | null
        }
        Update: {
          address?: string
          business_license?: string | null
          contact_email?: string
          created_at?: string
          description?: string | null
          id?: string
          id_card_number?: string
          name?: string
          owner_id?: string
          owner_name?: string
          phone_number?: string
          slug?: string
          status?: string
          updated_at?: string | null
          verification_details?: Json | null
          verification_documents?: Json | null
          verification_rejected_reason?: string | null
          verification_status?: string | null
          verification_submitted_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      sponsored_products: {
        Row: {
          amount_paid: number
          boost_level: number
          created_at: string | null
          end_date: string
          id: string
          product_id: string
          shop_id: string
          start_date: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount_paid: number
          boost_level?: number
          created_at?: string | null
          end_date: string
          id?: string
          product_id: string
          shop_id: string
          start_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount_paid?: number
          boost_level?: number
          created_at?: string | null
          end_date?: string
          id?: string
          product_id?: string
          shop_id?: string
          start_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sponsored_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sponsored_products_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      system_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          related_id: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          related_id?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          related_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_levels: {
        Row: {
          average_rating: number | null
          created_at: string
          current_level: string
          id: string
          points: number | null
          total_orders: number | null
          total_sales: number | null
          total_spent: number | null
          type: Database["public"]["Enums"]["user_level_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          average_rating?: number | null
          created_at?: string
          current_level: string
          id?: string
          points?: number | null
          total_orders?: number | null
          total_sales?: number | null
          total_spent?: number | null
          type: Database["public"]["Enums"]["user_level_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          average_rating?: number | null
          created_at?: string
          current_level?: string
          id?: string
          points?: number | null
          total_orders?: number | null
          total_sales?: number | null
          total_spent?: number | null
          type?: Database["public"]["Enums"]["user_level_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_claim_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      log_system_action: {
        Args: {
          action_name: string
          action_details: Json
          action_related_id?: string
        }
        Returns: undefined
      }
      maintain_lucky_draw_system: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      revoke_unclaimed_prizes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      select_winners_for_campaign: {
        Args: {
          campaign_uuid: string
        }
        Returns: undefined
      }
      update_campaign_statuses: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      buyer_level_name:
        | "Newbie Shopper"
        | "Frequent Buyer"
        | "VIP Shopper"
        | "Elite Member"
      seller_level_name:
        | "Starter Seller"
        | "Growing Seller"
        | "Top Seller"
        | "Platinum Seller"
      user_level_type: "buyer" | "seller"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
