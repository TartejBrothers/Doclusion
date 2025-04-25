export interface Doctor {
  id: string;
  name: string;
  photo: string;
  specialities: { name: string }[];
  video_consult: boolean;
  in_clinic: boolean;
  experience: string;
  fees: string;
}

export type ConsultationMode = "video" | "in_clinic";
export type SortOption = "fees" | "experience";
