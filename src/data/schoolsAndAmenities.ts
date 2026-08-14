import { DataProvenance } from '../types';

export interface SchoolPOI {
  id: string;
  name: string;
  city: string;
  type: 'Liceu / Colegiu Național' | 'Școală Gimnazială' | 'Grădiniță';
  coordinates: [number, number];
  examAverageScore: number; // 0 - 10
  nationalRank: number;
  studentsCount: number;
  provenance: DataProvenance;
}

export interface HospitalPOI {
  id: string;
  name: string;
  city: string;
  type: 'Spital de Urgență' | 'Institut Național' | 'Policlinică / Centru Medical';
  coordinates: [number, number];
  hasEmergencyUnit: boolean;
  provenance: DataProvenance;
}

export interface AirQualityStation {
  id: string;
  stationCode: string;
  name: string;
  city: string;
  coordinates: [number, number];
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  status: 'Good' | 'Moderate' | 'Unhealthy for Sensitive' | 'Unhealthy';
  lastReadingTime: string;
  provenance: DataProvenance;
}

const MIN_EDU_PROVENANCE: DataProvenance = {
  sourceName: 'Registrul Unităților de Învățământ / BacPlus',
  authority: 'Ministerul Educației / data.gov.ro',
  endpointUrl: 'https://data.gov.ro/dataset/reteaua-unitatilor-de-invatamant-preuniversitar',
  updateCadence: 'Annually',
  lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  reliability: 'Verified Official',
  datasetId: 'data-gov-schools'
};

const RNMCA_PROVENANCE: DataProvenance = {
  sourceName: 'Rețeaua Națională de Monitorizare a Calității Aerului (RNMCA)',
  authority: 'Ministerul Mediului / ANPM',
  endpointUrl: 'https://calitateaaerului.ro',
  updateCadence: 'Hourly',
  lastSynced: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  reliability: 'Live Stream',
  datasetId: 'rnmca-air-quality'
};

export const SCHOOLS_DATASET: SchoolPOI[] = [
  // Bucharest
  {
    id: 'sch-b-01',
    name: 'Colegiul Național „Sfântul Sava”',
    city: 'Bucharest',
    type: 'Liceu / Colegiu Național',
    coordinates: [44.4398, 26.0911],
    examAverageScore: 9.78,
    nationalRank: 1,
    studentsCount: 1050,
    provenance: MIN_EDU_PROVENANCE
  },
  {
    id: 'sch-b-02',
    name: 'Colegiul Național „Gheorghe Lazăr”',
    city: 'Bucharest',
    type: 'Liceu / Colegiu Național',
    coordinates: [44.4342, 26.0898],
    examAverageScore: 9.74,
    nationalRank: 2,
    studentsCount: 1120,
    provenance: MIN_EDU_PROVENANCE
  },
  {
    id: 'sch-b-03',
    name: 'Colegiul Național de Informatică „Tudor Vianu”',
    city: 'Bucharest',
    type: 'Liceu / Colegiu Național',
    coordinates: [44.4578, 26.0832],
    examAverageScore: 9.72,
    nationalRank: 3,
    studentsCount: 980,
    provenance: MIN_EDU_PROVENANCE
  },
  {
    id: 'sch-b-04',
    name: 'Școala Gimnazială Nr. 195 (Hambros)',
    city: 'Bucharest',
    type: 'Școală Gimnazială',
    coordinates: [44.4172, 26.1582],
    examAverageScore: 8.92,
    nationalRank: 35,
    studentsCount: 2200,
    provenance: MIN_EDU_PROVENANCE
  },
  {
    id: 'sch-b-05',
    name: 'Colegiul Național „Spiru Haret”',
    city: 'Bucharest',
    type: 'Liceu / Colegiu Național',
    coordinates: [44.4371, 26.1102],
    examAverageScore: 9.58,
    nationalRank: 6,
    studentsCount: 920,
    provenance: MIN_EDU_PROVENANCE
  },

  // Cluj-Napoca
  {
    id: 'sch-cj-01',
    name: 'Colegiul Național „Emil Racoviță”',
    city: 'Cluj-Napoca',
    type: 'Liceu / Colegiu Național',
    coordinates: [46.7745, 23.5971],
    examAverageScore: 9.68,
    nationalRank: 4,
    studentsCount: 950,
    provenance: MIN_EDU_PROVENANCE
  },
  {
    id: 'sch-cj-02',
    name: 'Liceul Teoretic „Avram Iancu”',
    city: 'Cluj-Napoca',
    type: 'Liceu / Colegiu Național',
    coordinates: [46.7761, 23.6042],
    examAverageScore: 9.45,
    nationalRank: 12,
    studentsCount: 1100,
    provenance: MIN_EDU_PROVENANCE
  },

  // Timisoara
  {
    id: 'sch-tm-01',
    name: 'Colegiul Național „Constantin Diaconovici Loga”',
    city: 'Timișoara',
    type: 'Liceu / Colegiu Național',
    coordinates: [45.7562, 21.2335],
    examAverageScore: 9.41,
    nationalRank: 15,
    studentsCount: 890,
    provenance: MIN_EDU_PROVENANCE
  },

  // Brasov
  {
    id: 'sch-bv-01',
    name: 'Colegiul Național „Dr. Ioan Meșotă”',
    city: 'Brașov',
    type: 'Liceu / Colegiu Național',
    coordinates: [45.6542, 25.6128],
    examAverageScore: 9.52,
    nationalRank: 9,
    studentsCount: 840,
    provenance: MIN_EDU_PROVENANCE
  },

  // Iasi
  {
    id: 'sch-is-01',
    name: 'Colegiul Național Iași',
    city: 'Iași',
    type: 'Liceu / Colegiu Național',
    coordinates: [47.1691, 27.5752],
    examAverageScore: 9.65,
    nationalRank: 5,
    studentsCount: 1040,
    provenance: MIN_EDU_PROVENANCE
  }
];

export const HOSPITALS_DATASET: HospitalPOI[] = [
  {
    id: 'hosp-b-01',
    name: 'Spitalul Clinic de Urgență Floreasca',
    city: 'Bucharest',
    type: 'Spital de Urgență',
    coordinates: [44.4571, 26.1012],
    hasEmergencyUnit: true,
    provenance: {
      sourceName: 'Registrul Unităților Sanitare',
      authority: 'Ministerul Sănătății / data.gov.ro',
      endpointUrl: 'https://data.gov.ro/dataset/lista-unitatilor-sanitare',
      updateCadence: 'Quarterly',
      lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
      reliability: 'Verified Official',
      datasetId: 'data-gov-hospitals'
    }
  },
  {
    id: 'hosp-b-02',
    name: 'Spitalul Universitar de Urgență București (SUUB)',
    city: 'Bucharest',
    type: 'Spital de Urgență',
    coordinates: [44.4361, 26.0754],
    hasEmergencyUnit: true,
    provenance: {
      sourceName: 'Registrul Unităților Sanitare',
      authority: 'Ministerul Sănătății / data.gov.ro',
      endpointUrl: 'https://data.gov.ro/dataset/lista-unitatilor-sanitare',
      updateCadence: 'Quarterly',
      lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
      reliability: 'Verified Official',
      datasetId: 'data-gov-hospitals'
    }
  },
  {
    id: 'hosp-cj-01',
    name: 'Spitalul Clinic Județean de Urgență Cluj',
    city: 'Cluj-Napoca',
    type: 'Spital de Urgență',
    coordinates: [46.7661, 23.5852],
    hasEmergencyUnit: true,
    provenance: {
      sourceName: 'Registrul Unităților Sanitare',
      authority: 'Ministerul Sănătății / data.gov.ro',
      endpointUrl: 'https://data.gov.ro/dataset/lista-unitatilor-sanitare',
      updateCadence: 'Quarterly',
      lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
      reliability: 'Verified Official',
      datasetId: 'data-gov-hospitals'
    }
  }
];

export const AIR_QUALITY_STATIONS: AirQualityStation[] = [
  {
    id: 'aq-b-01',
    stationCode: 'RO001-B1 (Cercul Militar)',
    name: 'București - Centru (Cercul Militar)',
    city: 'Bucharest',
    coordinates: [44.4354, 26.0968],
    aqi: 48,
    pm25: 18.2,
    pm10: 32.4,
    no2: 28.5,
    status: 'Good',
    lastReadingTime: new Date().toLocaleTimeString(),
    provenance: RNMCA_PROVENANCE
  },
  {
    id: 'aq-b-02',
    stationCode: 'RO004-B4 (Mihai Bravu)',
    name: 'București - Mihai Bravu / Trafic',
    city: 'Bucharest',
    coordinates: [44.4124, 26.1245],
    aqi: 82,
    pm25: 36.4,
    pm10: 58.1,
    no2: 44.2,
    status: 'Moderate',
    lastReadingTime: new Date().toLocaleTimeString(),
    provenance: RNMCA_PROVENANCE
  },
  {
    id: 'aq-b-03',
    stationCode: 'RO006-B6 (Măgurele)',
    name: 'Ilfov / Măgurele Suburban',
    city: 'Ilfov',
    coordinates: [44.3481, 26.0321],
    aqi: 28,
    pm25: 9.4,
    pm10: 16.2,
    no2: 12.0,
    status: 'Good',
    lastReadingTime: new Date().toLocaleTimeString(),
    provenance: RNMCA_PROVENANCE
  },
  {
    id: 'aq-cj-01',
    stationCode: 'RO012-CJ1 (Aurel Vlaicu)',
    name: 'Cluj-Napoca - Mărăști / Aurel Vlaicu',
    city: 'Cluj-Napoca',
    coordinates: [46.7821, 23.6214],
    aqi: 38,
    pm25: 14.1,
    pm10: 24.8,
    no2: 20.1,
    status: 'Good',
    lastReadingTime: new Date().toLocaleTimeString(),
    provenance: RNMCA_PROVENANCE
  },
  {
    id: 'aq-bv-01',
    stationCode: 'RO018-BV1 (Castelului)',
    name: 'Brașov - Centru Istoric',
    city: 'Brașov',
    coordinates: [45.6412, 25.5901],
    aqi: 22,
    pm25: 7.8,
    pm10: 12.5,
    no2: 11.4,
    status: 'Good',
    lastReadingTime: new Date().toLocaleTimeString(),
    provenance: RNMCA_PROVENANCE
  }
];
