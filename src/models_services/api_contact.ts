import axios from 'axios';

interface Contact {
  name: string;
  email: string;
  message: string;
}

export async function sentContactEmail({ name, email, message }: Contact): Promise<boolean | null> {
  try {
    await axios.post(`/api/contact`, { name, email, message });
    return true;
  } catch (error: any) {
    console.log(error);
    console.log(error?.response?.data?.message);
    throw error;
  }
}
