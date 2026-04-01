import { supabase } from '@/src/lib/supabase';

// =====================================================
// USER SERVICES
// =====================================================

export const userService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  async updateProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },
};

// =====================================================
// ACTOR SERVICES
// =====================================================

export const actorService = {
  async getActorProfile(userId: string) {
    const { data, error } = await supabase
      .from('actor_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    return { data, error };
  },

  async createActorProfile(profile: any) {
    const { data, error } = await supabase
      .from('actor_profiles')
      .insert(profile)
      .select()
      .single();
    return { data, error };
  },

  async updateActorProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('actor_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();
    return { data, error };
  },

  async getAllActors(filters?: { skills?: string[]; location?: string; verified?: boolean }) {
    let query = supabase
      .from('actors_full_profile')
      .select('*');

    if (filters?.location) {
      query = query.eq('location', filters.location);
    }
    if (filters?.verified) {
      query = query.eq('is_verified', true);
    }
    if (filters?.skills && filters.skills.length > 0) {
      query = query.contains('skills', filters.skills);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async getActorExperience(actorId: string) {
    const { data, error } = await supabase
      .from('actor_experience')
      .select('*')
      .eq('actor_id', actorId)
      .order('year', { ascending: false });
    return { data, error };
  },

  async addExperience(experience: any) {
    const { data, error } = await supabase
      .from('actor_experience')
      .insert(experience)
      .select()
      .single();
    return { data, error };
  },

  async getActorAwards(actorId: string) {
    const { data, error } = await supabase
      .from('actor_awards')
      .select('*')
      .eq('actor_id', actorId);
    return { data, error };
  },
};

// =====================================================
// COMPANY SERVICES
// =====================================================

export const companyService = {
  async getCompany(userId: string) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('user_id', userId)
      .single();
    return { data, error };
  },

  async createCompany(company: any) {
    const { data, error } = await supabase
      .from('companies')
      .insert(company)
      .select()
      .single();
    return { data, error };
  },

  async updateCompany(companyId: string, updates: any) {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', companyId)
      .select()
      .single();
    return { data, error };
  },

  async getTeamMembers(companyId: string) {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('company_id', companyId);
    return { data, error };
  },

  async addTeamMember(member: any) {
    const { data, error } = await supabase
      .from('team_members')
      .insert(member)
      .select()
      .single();
    return { data, error };
  },
};

// =====================================================
// PROJECT SERVICES
// =====================================================

export const projectService = {
  async getProjects(companyId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getProject(projectId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
    return { data, error };
  },

  async createProject(project: any) {
    const { data, error } = await supabase
      .from('projects')
      .insert(project)
      .select()
      .single();
    return { data, error };
  },

  async updateProject(projectId: string, updates: any) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();
    return { data, error };
  },

  async deleteProject(projectId: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);
    return { error };
  },
};

// =====================================================
// AUDITION SERVICES
// =====================================================

export const auditionService = {
  async getAuditions(filters?: {
    category?: string;
    location?: string;
    gender?: string;
    verified?: boolean;
    search?: string;
  }) {
    let query = supabase
      .from('auditions_with_company')
      .select('*')
      .gte('deadline', new Date().toISOString().split('T')[0])
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.location) {
      query = query.eq('location', filters.location);
    }
    if (filters?.gender && filters.gender !== 'Any') {
      query = query.or(`gender.eq.${filters.gender},gender.eq.Any`);
    }
    if (filters?.verified) {
      query = query.eq('is_verified', true);
    }
    if (filters?.search) {
      query = query.ilike('title', `%${filters.search}%`);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async getAudition(auditionId: string) {
    const { data, error } = await supabase
      .from('auditions_with_company')
      .select('*')
      .eq('id', auditionId)
      .single();
    return { data, error };
  },

  async createAudition(audition: any) {
    const { data, error } = await supabase
      .from('auditions')
      .insert(audition)
      .select()
      .single();
    return { data, error };
  },

  async updateAudition(auditionId: string, updates: any) {
    const { data, error } = await supabase
      .from('auditions')
      .update(updates)
      .eq('id', auditionId)
      .select()
      .single();
    return { data, error };
  },

  async deleteAudition(auditionId: string) {
    const { error } = await supabase
      .from('auditions')
      .delete()
      .eq('id', auditionId);
    return { error };
  },

  async incrementViews(auditionId: string) {
    const { error } = await supabase.rpc('increment_views', { audition_id: auditionId });
    return { error };
  },
};

// =====================================================
// APPLICATION SERVICES
// =====================================================

export const applicationService = {
  async getMyApplications(actorId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        audition:auditions(
          *,
          company:companies(name, logo_url)
        )
      `)
      .eq('actor_id', actorId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getApplicationsForAudition(auditionId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        actor:users(
          *,
          profile:actor_profiles(*)
        )
      `)
      .eq('audition_id', auditionId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async applyToAudition(application: { audition_id: string; actor_id: string; video_url?: string; cover_letter?: string }) {
    const { data, error } = await supabase
      .from('applications')
      .insert(application)
      .select()
      .single();
    return { data, error };
  },

  async updateApplicationStatus(applicationId: string, status: string) {
    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', applicationId)
      .select()
      .single();
    return { data, error };
  },

  async checkIfApplied(auditionId: string, actorId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select('id')
      .eq('audition_id', auditionId)
      .eq('actor_id', actorId)
      .single();
    return { applied: !!data, error };
  },
};

// =====================================================
// BOOKMARK SERVICES
// =====================================================

export const bookmarkService = {
  async getBookmarks(userId: string) {
    const { data, error } = await supabase
      .from('bookmarks')
      .select(`
        *,
        audition:auditions(
          *,
          company:companies(name, logo_url)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async addBookmark(userId: string, auditionId: string) {
    const { data, error } = await supabase
      .from('bookmarks')
      .insert({ user_id: userId, audition_id: auditionId })
      .select()
      .single();
    return { data, error };
  },

  async removeBookmark(userId: string, auditionId: string) {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('audition_id', auditionId);
    return { error };
  },

  async isBookmarked(userId: string, auditionId: string) {
    const { data, error } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('user_id', userId)
      .eq('audition_id', auditionId)
      .single();
    return { bookmarked: !!data, error };
  },
};

// =====================================================
// ALERT SERVICES
// =====================================================

export const alertService = {
  async getAlerts(userId: string) {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createAlert(alert: any) {
    const { data, error } = await supabase
      .from('alerts')
      .insert(alert)
      .select()
      .single();
    return { data, error };
  },

  async updateAlert(alertId: string, updates: any) {
    const { data, error } = await supabase
      .from('alerts')
      .update(updates)
      .eq('id', alertId)
      .select()
      .single();
    return { data, error };
  },

  async deleteAlert(alertId: string) {
    const { error } = await supabase
      .from('alerts')
      .delete()
      .eq('id', alertId);
    return { error };
  },

  async toggleAlert(alertId: string, isActive: boolean) {
    const { data, error } = await supabase
      .from('alerts')
      .update({ is_active: isActive })
      .eq('id', alertId)
      .select()
      .single();
    return { data, error };
  },
};

// =====================================================
// NOTIFICATION SERVICES
// =====================================================

export const notificationService = {
  async getNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getUnreadCount(userId: string) {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    return { count, error };
  },

  async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
    return { error };
  },

  async markAllAsRead(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    return { error };
  },
};

// =====================================================
// SHORTLIST SERVICES
// =====================================================

export const shortlistService = {
  async getShortlist(directorId: string) {
    const { data, error } = await supabase
      .from('shortlists')
      .select(`
        *,
        actor:users!shortlists_actor_id_fkey(
          *,
          profile:actor_profiles(*)
        ),
        audition:auditions(title)
      `)
      .eq('director_id', directorId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async addToShortlist(directorId: string, actorId: string, auditionId?: string, notes?: string) {
    const { data, error } = await supabase
      .from('shortlists')
      .insert({ 
        director_id: directorId, 
        actor_id: actorId, 
        audition_id: auditionId,
        notes 
      })
      .select()
      .single();
    return { data, error };
  },

  async removeFromShortlist(shortlistId: string) {
    const { error } = await supabase
      .from('shortlists')
      .delete()
      .eq('id', shortlistId);
    return { error };
  },

  async isShortlisted(directorId: string, actorId: string) {
    const { data, error } = await supabase
      .from('shortlists')
      .select('id')
      .eq('director_id', directorId)
      .eq('actor_id', actorId)
      .single();
    return { shortlisted: !!data, error };
  },
};

// =====================================================
// STORAGE SERVICES
// =====================================================

export const storageService = {
  async uploadAvatar(userId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) return { url: null, error: uploadError };

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return { url: data.publicUrl, error: null };
  },

  async uploadVideo(userId: string, file: File, type: 'audition' | 'intro') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, file);

    if (uploadError) return { url: null, error: uploadError };

    const { data } = supabase.storage.from('videos').getPublicUrl(filePath);
    return { url: data.publicUrl, error: null };
  },

  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    return { error };
  },
};

// =====================================================
// AI SESSION SERVICES (NEW - tracks Gemini AI usage)
// =====================================================

export const aiService = {
  async logSession(userId: string, toolUsed: string, promptTokens = 0, responseTokens = 0) {
    const { data, error } = await supabase
      .from('ai_sessions')
      .insert({ user_id: userId, tool_used: toolUsed, prompt_tokens: promptTokens, response_tokens: responseTokens })
      .select()
      .single();
    return { data, error };
  },

  async getSessionHistory(userId: string) {
    const { data, error } = await supabase
      .from('ai_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);
    return { data, error };
  },
};

// =====================================================
// MESSAGE SERVICES (NEW - Direct messaging)
// =====================================================

export const messageService = {
  async getConversation(userId: string, otherUserId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users!messages_sender_id_fkey(name, avatar_url)')
      .or(`and(sender_id.eq.${userId},recipient_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},recipient_id.eq.${userId})`)
      .order('created_at', { ascending: true });
    return { data, error };
  },

  async sendMessage(senderId: string, recipientId: string, content: string, auditionId?: string) {
    const { data, error } = await supabase
      .from('messages')
      .insert({ sender_id: senderId, recipient_id: recipientId, content, audition_id: auditionId })
      .select()
      .single();
    return { data, error };
  },

  async markRead(senderId: string, recipientId: string) {
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('sender_id', senderId)
      .eq('recipient_id', recipientId)
      .eq('is_read', false);
    return { error };
  },

  async getUnreadCount(userId: string) {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('recipient_id', userId)
      .eq('is_read', false);
    return { count, error };
  },
};

// =====================================================
// PORTFOLIO SERVICES (NEW - persistent portfolio items)
// =====================================================

export const portfolioService = {
  async getPortfolio(actorId: string) {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('actor_id', actorId)
      .order('sort_order', { ascending: true });
    return { data, error };
  },

  async addItem(item: { actor_id: string; type: 'image' | 'video'; url: string; title?: string; description?: string; sort_order?: number }) {
    const { data, error } = await supabase
      .from('portfolio_items')
      .insert(item)
      .select()
      .single();
    return { data, error };
  },

  async removeItem(itemId: string) {
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', itemId);
    return { error };
  },

  async reorder(items: { id: string; sort_order: number }[]) {
    const updates = items.map(item =>
      supabase.from('portfolio_items').update({ sort_order: item.sort_order }).eq('id', item.id)
    );
    await Promise.all(updates);
  },
};
