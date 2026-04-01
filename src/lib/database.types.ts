export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'ACTOR' | 'CASTING_DIRECTOR' | 'ADMIN'
          avatar_url: string | null
          is_verified: boolean
          bio: string | null
          location: string | null
          phone: string | null
          profile_completion: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: 'ACTOR' | 'CASTING_DIRECTOR' | 'ADMIN'
          avatar_url?: string | null
          is_verified?: boolean
          bio?: string | null
          location?: string | null
          phone?: string | null
          profile_completion?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'ACTOR' | 'CASTING_DIRECTOR' | 'ADMIN'
          avatar_url?: string | null
          is_verified?: boolean
          bio?: string | null
          location?: string | null
          phone?: string | null
          profile_completion?: number
          created_at?: string
          updated_at?: string
        }
      }
      actor_profiles: {
        Row: {
          id: string
          user_id: string
          age: number | null
          height: string | null
          weight: string | null
          eye_color: string | null
          hair_color: string | null
          languages: string[] | null
          skills: string[] | null
          experience_years: number | null
          education: string | null
          instagram: string | null
          youtube: string | null
          website: string | null
          availability: string | null
          expected_rate: string | null
          rating: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          age?: number | null
          height?: string | null
          weight?: string | null
          eye_color?: string | null
          hair_color?: string | null
          languages?: string[] | null
          skills?: string[] | null
          experience_years?: number | null
          education?: string | null
          instagram?: string | null
          youtube?: string | null
          website?: string | null
          availability?: string | null
          expected_rate?: string | null
          rating?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          age?: number | null
          height?: string | null
          weight?: string | null
          eye_color?: string | null
          hair_color?: string | null
          languages?: string[] | null
          skills?: string[] | null
          experience_years?: number | null
          education?: string | null
          instagram?: string | null
          youtube?: string | null
          website?: string | null
          availability?: string | null
          expected_rate?: string | null
          rating?: number
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          user_id: string
          name: string
          type: string | null
          founded_year: number | null
          address: string | null
          employees_count: string | null
          website: string | null
          description: string | null
          logo_url: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type?: string | null
          founded_year?: number | null
          address?: string | null
          employees_count?: string | null
          website?: string | null
          description?: string | null
          logo_url?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: string | null
          founded_year?: number | null
          address?: string | null
          employees_count?: string | null
          website?: string | null
          description?: string | null
          logo_url?: string | null
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          company_id: string
          title: string
          type: string
          status: string
          director: string | null
          producer: string | null
          start_date: string | null
          end_date: string | null
          budget: string | null
          description: string | null
          image_url: string | null
          total_roles: number
          filled_roles: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          title: string
          type: string
          status?: string
          director?: string | null
          producer?: string | null
          start_date?: string | null
          end_date?: string | null
          budget?: string | null
          description?: string | null
          image_url?: string | null
          total_roles?: number
          filled_roles?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          title?: string
          type?: string
          status?: string
          director?: string | null
          producer?: string | null
          start_date?: string | null
          end_date?: string | null
          budget?: string | null
          description?: string | null
          image_url?: string | null
          total_roles?: number
          filled_roles?: number
          created_at?: string
          updated_at?: string
        }
      }
      auditions: {
        Row: {
          id: string
          project_id: string | null
          company_id: string
          title: string
          description: string | null
          category: string
          location: string
          gender: string
          age_range: string | null
          is_paid: boolean
          compensation: string | null
          is_verified: boolean
          deadline: string
          script: string | null
          requirements: string | null
          views_count: number
          applicants_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          company_id: string
          title: string
          description?: string | null
          category: string
          location: string
          gender?: string
          age_range?: string | null
          is_paid?: boolean
          compensation?: string | null
          is_verified?: boolean
          deadline: string
          script?: string | null
          requirements?: string | null
          views_count?: number
          applicants_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string | null
          company_id?: string
          title?: string
          description?: string | null
          category?: string
          location?: string
          gender?: string
          age_range?: string | null
          is_paid?: boolean
          compensation?: string | null
          is_verified?: boolean
          deadline?: string
          script?: string | null
          requirements?: string | null
          views_count?: number
          applicants_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          audition_id: string
          actor_id: string
          status: string
          video_url: string | null
          cover_letter: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          audition_id: string
          actor_id: string
          status?: string
          video_url?: string | null
          cover_letter?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          audition_id?: string
          actor_id?: string
          status?: string
          video_url?: string | null
          cover_letter?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          audition_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          audition_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          audition_id?: string
          created_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          user_id: string
          title: string
          criteria: Json
          frequency: string
          is_active: boolean
          last_triggered_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          criteria: Json
          frequency?: string
          is_active?: boolean
          last_triggered_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          criteria?: Json
          frequency?: string
          is_active?: boolean
          last_triggered_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          created_at?: string
        }
      }
      actor_experience: {
        Row: {
          id: string
          actor_id: string
          title: string
          role: string
          year: string
          type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          actor_id: string
          title: string
          role: string
          year: string
          type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          actor_id?: string
          title?: string
          role?: string
          year?: string
          type?: string | null
          created_at?: string
        }
      }
      actor_awards: {
        Row: {
          id: string
          actor_id: string
          title: string
          year: string | null
          created_at: string
        }
        Insert: {
          id?: string
          actor_id: string
          title: string
          year?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          actor_id?: string
          title?: string
          year?: string | null
          created_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          company_id: string
          name: string
          role: string
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          role: string
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          role?: string
          image_url?: string | null
          created_at?: string
        }
      }
      shortlists: {
        Row: {
          id: string
          director_id: string
          actor_id: string
          audition_id: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          director_id: string
          actor_id: string
          audition_id?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          director_id?: string
          actor_id?: string
          audition_id?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          subscribed_at: string
          source: string | null
        }
        Insert: {
          id?: string
          email: string
          subscribed_at?: string
          source?: string | null
        }
        Update: {
          id?: string
          email?: string
          subscribed_at?: string
          source?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'ACTOR' | 'CASTING_DIRECTOR' | 'ADMIN'
      application_status: 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'REJECTED' | 'SELECTED'
      project_status: 'CASTING' | 'PRE_PRODUCTION' | 'IN_PRODUCTION' | 'POST_PRODUCTION' | 'COMPLETED'
      project_type: 'FEATURE_FILM' | 'WEB_SERIES' | 'SHORT_FILM' | 'COMMERCIAL' | 'MUSIC_VIDEO' | 'THEATER' | 'PODCAST'
    }
  }
}

// =====================================================
// Extended types for new tables (v2 schema)
// =====================================================

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  audition_id: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
  sender?: { name: string; avatar_url: string | null };
}

export interface PortfolioItem {
  id: string;
  actor_id: string;
  type: 'image' | 'video';
  url: string;
  title: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface AISession {
  id: string;
  user_id: string;
  tool_used: string;
  prompt_tokens: number;
  response_tokens: number;
  created_at: string;
}
