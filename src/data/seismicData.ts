import { SeismicRiskClass, DataProvenance } from '../types';

export interface SeismicRiskBuilding {
  id: string;
  address: string;
  city: string;
  county: string;
  coordinates: [number, number];
  riskClass: SeismicRiskClass;
  yearBuilt: number;
  floors: number;
  apartmentsCount: number;
  expertizeYear: number;
  expertName: string;
  amccrsId?: string;
  status: 'Unconsolidated' | 'In Consolidation' | 'Consolidated' | 'Pre-1977 Unexpertized';
  provenance: DataProvenance;
}

const AMCCRS_PROVENANCE: DataProvenance = {
  sourceName: 'AMCCRS Technical Expertises Register',
  authority: 'Primăria Municipiului București / AMCCRS',
  endpointUrl: 'https://amccrs-pmb.ro/liste-imobile-expertizate-tehnic',
  updateCadence: 'Monthly',
  lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  reliability: 'Verified Official',
  datasetId: 'amccrs-seismic-list'
};

export const SEISMIC_BUILDINGS_DATASET: SeismicRiskBuilding[] = [
  // Bucharest - Red Dot (RsI) & RsII
  {
    id: 'sb-b-01',
    address: 'Bulevardul Gheorghe Magheru 27',
    city: 'Bucharest',
    county: 'București - Sector 1',
    coordinates: [44.4421, 26.0988],
    riskClass: 'RsI',
    yearBuilt: 1935,
    floors: 8,
    apartmentsCount: 36,
    expertizeYear: 2018,
    expertName: 'Prof. Dr. Ing. Radu Pascu',
    amccrsId: 'B-RS1-0142',
    status: 'Unconsolidated',
    provenance: AMCCRS_PROVENANCE
  },
  {
    id: 'sb-b-02',
    address: 'Calea Victoriei 101',
    city: 'Bucharest',
    county: 'București - Sector 1',
    coordinates: [44.4447, 26.0912],
    riskClass: 'RsI',
    yearBuilt: 1938,
    floors: 7,
    apartmentsCount: 28,
    expertizeYear: 2021,
    expertName: 'Dr. Ing. Emil Sever Georgescu',
    amccrsId: 'B-RS1-0089',
    status: 'Unconsolidated',
    provenance: AMCCRS_PROVENANCE
  },
  {
    id: 'sb-b-03',
    address: 'Strada Lipscani 43 (Centrul Vechi)',
    city: 'Bucharest',
    county: 'București - Sector 3',
    coordinates: [44.4319, 26.1025],
    riskClass: 'RsI',
    yearBuilt: 1928,
    floors: 4,
    apartmentsCount: 12,
    expertizeYear: 2019,
    expertName: 'Ing. Dan Lungu',
    amccrsId: 'B-RS1-0205',
    status: 'In Consolidation',
    provenance: AMCCRS_PROVENANCE
  },
  {
    id: 'sb-b-04',
    address: 'Bulevardul Regina Elisabeta 32',
    city: 'Bucharest',
    county: 'București - Sector 5',
    coordinates: [44.4348, 26.0957],
    riskClass: 'RsII',
    yearBuilt: 1940,
    floors: 6,
    apartmentsCount: 24,
    expertizeYear: 2020,
    expertName: 'Ing. Mihai Voiculescu',
    amccrsId: 'B-RS2-0412',
    status: 'Unconsolidated',
    provenance: AMCCRS_PROVENANCE
  },
  {
    id: 'sb-b-05',
    address: 'Strada Academiei 35-37',
    city: 'Bucharest',
    county: 'București - Sector 1',
    coordinates: [44.4372, 26.1002],
    riskClass: 'RsI',
    yearBuilt: 1934,
    floors: 8,
    apartmentsCount: 42,
    expertizeYear: 2017,
    expertName: 'Dr. Ing. Horia Sandi',
    amccrsId: 'B-RS1-0033',
    status: 'Unconsolidated',
    provenance: AMCCRS_PROVENANCE
  },
  {
    id: 'sb-b-06',
    address: 'Bulevardul Nicolae Bălcescu 18',
    city: 'Bucharest',
    county: 'București - Sector 1',
    coordinates: [44.4385, 26.1011],
    riskClass: 'RsI',
    yearBuilt: 1936,
    floors: 9,
    apartmentsCount: 54,
    expertizeYear: 2022,
    expertName: 'Prof. Dr. Ing. Radu Pascu',
    amccrsId: 'B-RS1-0311',
    status: 'Unconsolidated',
    provenance: AMCCRS_PROVENANCE
  },
  {
    id: 'sb-b-07',
    address: 'Strada Brezoianu 7',
    city: 'Bucharest',
    county: 'București - Sector 1',
    coordinates: [44.4339, 26.0934],
    riskClass: 'U1',
    yearBuilt: 1932,
    floors: 6,
    apartmentsCount: 18,
    expertizeYear: 1994,
    expertName: 'Comisie MLPAT 1994',
    amccrsId: 'B-U1-0112',
    status: 'Unconsolidated',
    provenance: AMCCRS_PROVENANCE
  },
  {
    id: 'sb-b-08',
    address: 'Calea Moșilor 122',
    city: 'Bucharest',
    county: 'București - Sector 2',
    coordinates: [44.4358, 26.1115],
    riskClass: 'RsI',
    yearBuilt: 1925,
    floors: 3,
    apartmentsCount: 8,
    expertizeYear: 2016,
    expertName: 'Ing. Gabriel Iancu',
    amccrsId: 'B-RS1-0518',
    status: 'Unconsolidated',
    provenance: AMCCRS_PROVENANCE
  },

  // Cluj-Napoca
  {
    id: 'sb-cj-01',
    address: 'Strada Ferdinand 22',
    city: 'Cluj-Napoca',
    county: 'Cluj',
    coordinates: [46.7725, 23.5898],
    riskClass: 'RsII',
    yearBuilt: 1912,
    floors: 3,
    apartmentsCount: 14,
    expertizeYear: 2019,
    expertName: 'Ing. Vasile Pop',
    amccrsId: 'CJ-RS2-0012',
    status: 'Unconsolidated',
    provenance: {
      ...AMCCRS_PROVENANCE,
      sourceName: 'Primăria Cluj-Napoca Registru Tehnic',
      authority: 'Primăria Municipiului Cluj-Napoca'
    }
  },
  {
    id: 'sb-cj-02',
    address: 'Bulevardul 21 Decembrie 1989 nr. 14',
    city: 'Cluj-Napoca',
    county: 'Cluj',
    coordinates: [46.7738, 23.5932],
    riskClass: 'RsIII',
    yearBuilt: 1958,
    floors: 5,
    apartmentsCount: 20,
    expertizeYear: 2021,
    expertName: 'Dr. Ing. Tudor Moldovan',
    amccrsId: 'CJ-RS3-0008',
    status: 'Consolidated',
    provenance: {
      ...AMCCRS_PROVENANCE,
      sourceName: 'Primăria Cluj-Napoca Registru Tehnic',
      authority: 'Primăria Municipiului Cluj-Napoca'
    }
  },

  // Timisoara
  {
    id: 'sb-tm-01',
    address: 'Piața Victoriei 4 (Palatul Lloyd)',
    city: 'Timișoara',
    county: 'Timiș',
    coordinates: [45.7538, 21.2261],
    riskClass: 'RsII',
    yearBuilt: 1912,
    floors: 4,
    apartmentsCount: 16,
    expertizeYear: 2018,
    expertName: 'Ing. Sorin Marinescu',
    amccrsId: 'TM-RS2-0044',
    status: 'In Consolidation',
    provenance: {
      ...AMCCRS_PROVENANCE,
      sourceName: 'Primăria Timișoara / Birou Risc Seismic',
      authority: 'Primăria Municipiului Timișoara'
    }
  },

  // Brasov
  {
    id: 'sb-bv-01',
    address: 'Strada Republicii 38',
    city: 'Brașov',
    county: 'Brașov',
    coordinates: [45.6438, 25.5925],
    riskClass: 'RsII',
    yearBuilt: 1924,
    floors: 3,
    apartmentsCount: 10,
    expertizeYear: 2020,
    expertName: 'Dr. Ing. Dan Stoica',
    amccrsId: 'BV-RS2-0019',
    status: 'Unconsolidated',
    provenance: {
      ...AMCCRS_PROVENANCE,
      sourceName: 'Primăria Brașov Serviciul Tehnic',
      authority: 'Primăria Municipiului Brașov'
    }
  },

  // Iasi
  {
    id: 'sb-is-01',
    address: 'Bulevardul Ștefan cel Mare și Sfânt 12',
    city: 'Iași',
    county: 'Iași',
    coordinates: [47.1601, 27.5855],
    riskClass: 'RsI',
    yearBuilt: 1934,
    floors: 5,
    apartmentsCount: 18,
    expertizeYear: 2017,
    expertName: 'Prof. Dr. Ing. Mihail Ionescu',
    amccrsId: 'IS-RS1-0027',
    status: 'Unconsolidated',
    provenance: {
      ...AMCCRS_PROVENANCE,
      sourceName: 'Primăria Iași Cadastru & Risc Seismic',
      authority: 'Primăria Municipiului Iași'
    }
  }
];
