import { supabase } from '@/utils/supabase';

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export class ContactService {
  static async sendMessage(data: ContactData) {
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message
      });

    if (error) throw error;
  }
}