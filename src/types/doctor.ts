export interface Doctor {
  name: string;
  name_initials: string;
  photo: string;
  specialities: { name: string }[];
  experience: string;
  doctor_introduction?: string;
  languages?: string[];
  video_consult?: boolean;
  in_clinic?: boolean;
  fees: string;
  clinic: {
    name: string;
    address: {
      address_line1: string;
      locality: string;
      city: string;
      logo_url?: string;
      location?: string;
    };
  };
}
export type ConsultationMode = "video" | "in_clinic";
export type SortOption = "fees" | "experience";
