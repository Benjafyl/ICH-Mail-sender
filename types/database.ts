export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          business_name: string;
          category: string | null;
          city: string | null;
          commune: string | null;
          website: string | null;
          public_email: string | null;
          phone: string | null;
          source_url: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_name: string;
          category?: string | null;
          city?: string | null;
          commune?: string | null;
          website?: string | null;
          public_email?: string | null;
          phone?: string | null;
          source_url?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      lead_analysis: {
        Row: {
          id: string;
          lead_id: string;
          recommended_service: Database["public"]["Enums"]["recommended_service"];
          confidence_score: number;
          reasoning: string;
          detected_signals: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          recommended_service?: Database["public"]["Enums"]["recommended_service"];
          confidence_score?: number;
          reasoning: string;
          detected_signals?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["lead_analysis"]["Insert"]>;
        Relationships: [];
      };
      email_drafts: {
        Row: {
          id: string;
          lead_id: string;
          subject: string;
          body: string;
          status: Database["public"]["Enums"]["email_draft_status"];
          reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          subject: string;
          body: string;
          status?: Database["public"]["Enums"]["email_draft_status"];
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["email_drafts"]["Insert"]>;
        Relationships: [];
      };
      email_sends: {
        Row: {
          id: string;
          lead_id: string;
          email_draft_id: string;
          sent_to: string;
          provider: string;
          sent_at: string;
          response_status: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          email_draft_id: string;
          sent_to: string;
          provider: string;
          sent_at?: string;
          response_status?: string | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["email_sends"]["Insert"]>;
        Relationships: [];
      };
      opt_outs: {
        Row: {
          id: string;
          lead_id: string | null;
          email: string;
          reason: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          email: string;
          reason?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["opt_outs"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      recommended_service:
        | "maintenance"
        | "installation"
        | "replacement"
        | "evaluation";
      email_draft_status: "draft" | "approved" | "rejected" | "sent";
    };
    CompositeTypes: Record<string, never>;
  };
}
