import { Property } from '../types';

export const SAMPLE_PROPERTIES: Property[] = [
  // 1. Bucharest - Titan / Parklake Area (Modern / Safe Family Area)
  {
    id: 'prop-b-01',
    title: 'Modern 2-Room Apartment near Alexandru Ioan Cuza (IOR) Park',
    address: 'Strada Liviu Rebreanu 18, Sector 3',
    city: 'Bucharest',
    county: 'București',
    coordinates: [44.4214, 26.1512],
    priceEur: 118000,
    usableAreaSqm: 56,
    rooms: 2,
    floor: 4,
    totalFloors: 10,
    yearBuilt: 1984,
    cadastralNumber: '219402-C1-U14',
    landBookNumber: '219402',
    thumbnailUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: 'Bright 2-room apartment in reinforced concrete block, positioned 4 minutes walk from ParkLake Mall and IOR Park. Ideal buy-to-let property with high rental demand.',
    features: ['Park View', 'Balcony', 'Insulated Facade', 'Near Metro Titan', 'Central Heating'],
    diagnostics: {
      seismic: {
        riskClass: 'POST_1977_SAFE',
        structuralType: 'Panouri Mari Beton Armat (Monolit Post-1977)',
        groundAccelerationAg: 0.30,
        mortgageEligibility: 'FULL',
        provenance: {
          sourceName: 'Normativ P100-1 / Cadastru Imobiliar',
          authority: 'AMCCRS / MDLPA',
          endpointUrl: 'https://amccrs-pmb.ro',
          updateCadence: 'Monthly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'amccrs-seismic-list'
        }
      },
      flood: {
        level: 'NONE',
        catchmentBasin: 'Bazin Hidrografic Argeș-Vedea / Dâmbovița Casetată',
        provenance: {
          sourceName: 'Apele Române Hărți Hazard',
          authority: 'Administrația Națională Apele Române',
          endpointUrl: 'https://rowater.ro',
          updateCadence: 'Static/Official Regs',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'apele-romane-flood-hazard'
        }
      },
      heritage: {
        isMonument: false,
        renovationConstraints: 'Standard municipal building permit (No Ministry of Culture restrictions).',
        provenance: {
          sourceName: 'Registrul Monumentelor Istorice (LMI)',
          authority: 'Institutul Național al Patrimoniului',
          endpointUrl: 'https://patrimoniu.ro',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'monumente-istorice-lmi'
        }
      },
      airQuality: {
        aqi: 38,
        pm25: 14.2,
        pm10: 24.5,
        status: 'Good',
        nearestSensor: 'RNMCA RO005 (Titan Park Station)',
        provenance: {
          sourceName: 'Rețeaua Națională Calitatea Aerului',
          authority: 'Ministerul Mediului / RNMCA',
          endpointUrl: 'https://calitateaaerului.ro',
          updateCadence: 'Hourly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
          reliability: 'Live Stream',
          datasetId: 'rnmca-air-quality'
        }
      },
      education: {
        nearestSchoolName: 'Școala Gimnazială Nr. 195 (Hambros)',
        schoolDistanceMeters: 450,
        examAverageScore: 8.92,
        provenance: {
          sourceName: 'Ministerul Educației / data.gov.ro',
          authority: 'Ministerul Educației',
          endpointUrl: 'https://data.gov.ro/dataset/reteaua-unitatilor-de-invatamant-preuniversitar',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'data-gov-schools'
        }
      },
      mobility: {
        walkScore: 92,
        transitScore: 95,
        nearestMetroStation: 'Metrou Titan (M1)',
        metroDistanceMeters: 380,
        commuteToCityCenterMin: 14,
        provenance: {
          sourceName: 'Metrorex / OpenStreetMap Mobility API',
          authority: 'Metrorex / OSM',
          endpointUrl: 'https://metrorex.ro',
          updateCadence: 'Quarterly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          reliability: 'Verified Official'
        }
      }
    },
    investment: {
      monthlyRentEstimateEur: 550,
      shortTermNightlyRateEur: 45,
      shortTermOccupancyPercent: 72,
      managementFeePercent: 10,
      estimatedRenovationCostEur: 3500
    }
  },

  // 2. Bucharest - Magheru / Universitate (Central / High Seismic Risk / Airbnb Potential)
  {
    id: 'prop-b-02',
    title: 'Historic Studio Apartment on Bulevardul Magheru (High Airbnb Yield)',
    address: 'Bulevardul Gheorghe Magheru 27, Sector 1',
    city: 'Bucharest',
    county: 'București',
    coordinates: [44.4421, 26.0988],
    priceEur: 69000,
    usableAreaSqm: 38,
    rooms: 1,
    floor: 6,
    totalFloors: 8,
    yearBuilt: 1935,
    cadastralNumber: '204118-C1-U22',
    landBookNumber: '204118',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    description: 'Interwar studio with high ceilings in the heart of Bucharest. Exceptional tourist location, but classified with Seismic Risk Class I (Red Bullet / RsI). Cash buyers only.',
    features: ['High Ceilings', 'Historic Architecture', 'Walk to Universitate Metro', 'High Short-term Rental Demand'],
    diagnostics: {
      seismic: {
        riskClass: 'RsI',
        amccrsCode: 'B-RS1-0142',
        expertizeYear: 2018,
        structuralType: 'Cadre Beton Armat Fără Detaliere Seismica (Pre-1940)',
        groundAccelerationAg: 0.30,
        mortgageEligibility: 'INELIGIBLE',
        provenance: {
          sourceName: 'AMCCRS Technical Expertises Register',
          authority: 'Primăria Municipiului București / AMCCRS',
          endpointUrl: 'https://amccrs-pmb.ro',
          updateCadence: 'Monthly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'amccrs-seismic-list'
        }
      },
      flood: {
        level: 'NONE',
        catchmentBasin: 'Bazin Hidrografic Argeș-Vedea',
        provenance: {
          sourceName: 'Apele Române Hărți Hazard',
          authority: 'Administrația Națională Apele Române',
          endpointUrl: 'https://rowater.ro',
          updateCadence: 'Static/Official Regs',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'apele-romane-flood-hazard'
        }
      },
      heritage: {
        isMonument: true,
        lmiCode: 'B-II-m-B-18230',
        protectedZoneName: 'Zona Construită Protejată Nr. 06 - Bulevardul Magheru',
        renovationConstraints: 'Approval from Ministry of Culture required. Facade alteration prohibited.',
        provenance: {
          sourceName: 'Registrul Monumentelor Istorice (LMI)',
          authority: 'Institutul Național al Patrimoniului',
          endpointUrl: 'https://patrimoniu.ro',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'monumente-istorice-lmi'
        }
      },
      airQuality: {
        aqi: 74,
        pm25: 32.8,
        pm10: 49.2,
        status: 'Moderate',
        nearestSensor: 'RNMCA RO001 (Cercul Militar)',
        provenance: {
          sourceName: 'Rețeaua Națională Calitatea Aerului',
          authority: 'Ministerul Mediului / RNMCA',
          endpointUrl: 'https://calitateaaerului.ro',
          updateCadence: 'Hourly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          reliability: 'Live Stream',
          datasetId: 'rnmca-air-quality'
        }
      },
      education: {
        nearestSchoolName: 'Colegiul Național „Sfântul Sava”',
        schoolDistanceMeters: 620,
        examAverageScore: 9.78,
        provenance: {
          sourceName: 'Ministerul Educației / data.gov.ro',
          authority: 'Ministerul Educației',
          endpointUrl: 'https://data.gov.ro/dataset/reteaua-unitatilor-de-invatamant-preuniversitar',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'data-gov-schools'
        }
      },
      mobility: {
        walkScore: 99,
        transitScore: 100,
        nearestMetroStation: 'Metrou Piața Romană / Universitate',
        metroDistanceMeters: 220,
        commuteToCityCenterMin: 0,
        provenance: {
          sourceName: 'Metrorex / OpenStreetMap',
          authority: 'Metrorex / OSM',
          endpointUrl: 'https://metrorex.ro',
          updateCadence: 'Quarterly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          reliability: 'Verified Official'
        }
      }
    },
    investment: {
      monthlyRentEstimateEur: 420,
      shortTermNightlyRateEur: 55,
      shortTermOccupancyPercent: 82,
      managementFeePercent: 15,
      estimatedRenovationCostEur: 7000
    }
  },

  // 3. Cluj-Napoca - Gheorgheni / Iulius Mall (Premium IT & University Hub)
  {
    id: 'prop-cj-01',
    title: 'Premium 2-Room New Build in Gheorgheni next to Iulius Mall',
    address: 'Strada Alexandru Vaida Voevod 53, Cluj-Napoca',
    city: 'Cluj-Napoca',
    county: 'Cluj',
    coordinates: [46.7718, 23.6264],
    priceEur: 165000,
    usableAreaSqm: 54,
    rooms: 2,
    floor: 3,
    totalFloors: 7,
    yearBuilt: 2022,
    cadastralNumber: '341908-C1-U18',
    landBookNumber: '341908',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    description: 'High-end apartment in contemporary complex. High IT professional rental density, underfloor heating, energy class A, near FSEGA university and Iulius Park.',
    features: ['Underfloor Heating', 'Underground Parking', 'Energy Class A', 'Iulius Mall Walk', 'Lake View'],
    diagnostics: {
      seismic: {
        riskClass: 'NEW_BUILD_SAFE',
        structuralType: 'Cadre și Diafragme Beton Armat (Eurocode 8 & P100-1/2013)',
        groundAccelerationAg: 0.20,
        mortgageEligibility: 'FULL',
        provenance: {
          sourceName: 'Primăria Cluj-Napoca Urbanism & P100-1',
          authority: 'Primăria Municipiului Cluj-Napoca',
          endpointUrl: 'https://primariaclujnapoca.ro',
          updateCadence: 'Monthly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'amccrs-seismic-list'
        }
      },
      flood: {
        level: 'NONE',
        catchmentBasin: 'Bazinul Hidrografic Someș-Tisa / Someșul Mic',
        provenance: {
          sourceName: 'Apele Române Hărți Hazard',
          authority: 'Administrația Bazinală Someș-Tisa',
          endpointUrl: 'https://rowater.ro',
          updateCadence: 'Static/Official Regs',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'apele-romane-flood-hazard'
        }
      },
      heritage: {
        isMonument: false,
        renovationConstraints: 'None (Modern residential development).',
        provenance: {
          sourceName: 'Registrul Monumentelor Istorice',
          authority: 'Institutul Național al Patrimoniului',
          endpointUrl: 'https://patrimoniu.ro',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
          reliability: 'Verified Official'
        }
      },
      airQuality: {
        aqi: 32,
        pm25: 11.5,
        pm10: 19.8,
        status: 'Good',
        nearestSensor: 'RNMCA RO012 (Gheorgheni Station)',
        provenance: {
          sourceName: 'Rețeaua Națională Calitatea Aerului',
          authority: 'Ministerul Mediului / RNMCA',
          endpointUrl: 'https://calitateaaerului.ro',
          updateCadence: 'Hourly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          reliability: 'Live Stream',
          datasetId: 'rnmca-air-quality'
        }
      },
      education: {
        nearestSchoolName: 'Liceul Teoretic „Avram Iancu”',
        schoolDistanceMeters: 780,
        examAverageScore: 9.45,
        provenance: {
          sourceName: 'Ministerul Educației / data.gov.ro',
          authority: 'Ministerul Educației',
          endpointUrl: 'https://data.gov.ro/dataset/reteaua-unitatilor-de-invatamant-preuniversitar',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'data-gov-schools'
        }
      },
      mobility: {
        walkScore: 89,
        transitScore: 88,
        nearestMetroStation: 'Bus Express CTP 24B / 25',
        metroDistanceMeters: 150,
        commuteToCityCenterMin: 12,
        provenance: {
          sourceName: 'CTP Cluj Open Transit Data',
          authority: 'Compania de Transport Public Cluj',
          endpointUrl: 'https://ctpcj.ro',
          updateCadence: 'Monthly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          reliability: 'Verified Official'
        }
      }
    },
    investment: {
      monthlyRentEstimateEur: 700,
      shortTermNightlyRateEur: 75,
      shortTermOccupancyPercent: 78,
      managementFeePercent: 10,
      estimatedRenovationCostEur: 0
    }
  },

  // 4. Timișoara - Iosefin / Complexul Studențesc
  {
    id: 'prop-tm-01',
    title: 'Spacious 3-Room Apartment near Polytechnic University & Complex',
    address: 'Bulevardul Vasile Pârvan 11, Timișoara',
    city: 'Timișoara',
    county: 'Timiș',
    coordinates: [45.7482, 21.2312],
    priceEur: 112000,
    usableAreaSqm: 68,
    rooms: 3,
    floor: 2,
    totalFloors: 4,
    yearBuilt: 1979,
    cadastralNumber: '408192-C1-U08',
    landBookNumber: '408192',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    description: 'Well-distributed 3-room property situated in the student hub. Consistent rental track record to academic faculty and university students.',
    features: ['Student Hub', 'Double Glazed Windows', 'Cellar Storage', 'Tram Line 1 min'],
    diagnostics: {
      seismic: {
        riskClass: 'POST_1977_SAFE',
        structuralType: 'Zidărie Confinată și Planșee Beton Armat Post-1977',
        groundAccelerationAg: 0.20,
        mortgageEligibility: 'FULL',
        provenance: {
          sourceName: 'Cadastru Timiș & P100-1',
          authority: 'MDLPA / Primăria Timișoara',
          endpointUrl: 'https://primariatm.ro',
          updateCadence: 'Monthly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'amccrs-seismic-list'
        }
      },
      flood: {
        level: 'NONE',
        catchmentBasin: 'Bazinul Hidrografic Banat / Canalul Bega',
        provenance: {
          sourceName: 'Apele Române Hărți Hazard',
          authority: 'Administrația Bazinală Banat',
          endpointUrl: 'https://rowater.ro',
          updateCadence: 'Static/Official Regs',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'apele-romane-flood-hazard'
        }
      },
      heritage: {
        isMonument: false,
        renovationConstraints: 'Standard residential regulations.',
        provenance: {
          sourceName: 'Registrul Monumentelor Istorice',
          authority: 'Institutul Național al Patrimoniului',
          endpointUrl: 'https://patrimoniu.ro',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
          reliability: 'Verified Official'
        }
      },
      airQuality: {
        aqi: 36,
        pm25: 12.8,
        pm10: 21.4,
        status: 'Good',
        nearestSensor: 'RNMCA RO015 (Timișoara Bega)',
        provenance: {
          sourceName: 'Rețeaua Națională Calitatea Aerului',
          authority: 'Ministerul Mediului / RNMCA',
          endpointUrl: 'https://calitateaaerului.ro',
          updateCadence: 'Hourly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          reliability: 'Live Stream',
          datasetId: 'rnmca-air-quality'
        }
      },
      education: {
        nearestSchoolName: 'Colegiul Național „C. D. Loga”',
        schoolDistanceMeters: 550,
        examAverageScore: 9.41,
        provenance: {
          sourceName: 'Ministerul Educației / data.gov.ro',
          authority: 'Ministerul Educației',
          endpointUrl: 'https://data.gov.ro/dataset/reteaua-unitatilor-de-invatamant-preuniversitar',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'data-gov-schools'
        }
      },
      mobility: {
        walkScore: 94,
        transitScore: 91,
        nearestMetroStation: 'Tramvai STPT 1, 2, 4',
        metroDistanceMeters: 100,
        commuteToCityCenterMin: 8,
        provenance: {
          sourceName: 'STPT Timișoara Open Transit',
          authority: 'Societatea de Transport Public Timișoara',
          endpointUrl: 'https://stpt.ro',
          updateCadence: 'Monthly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          reliability: 'Verified Official'
        }
      }
    },
    investment: {
      monthlyRentEstimateEur: 520,
      shortTermNightlyRateEur: 50,
      shortTermOccupancyPercent: 70,
      managementFeePercent: 10,
      estimatedRenovationCostEur: 4500
    }
  },

  // 5. Brașov - Centrul Civic / Coresi (Mountain Tourism & Relocation Hub)
  {
    id: 'prop-bv-01',
    title: 'Modern 2-Room Apartment near Coresi Shopping Resort & Business Park',
    address: 'Strada Zaharia Stancu 8, Brașov',
    city: 'Brașov',
    county: 'Brașov',
    coordinates: [45.6721, 25.6184],
    priceEur: 129000,
    usableAreaSqm: 58,
    rooms: 2,
    floor: 4,
    totalFloors: 8,
    yearBuilt: 2020,
    cadastralNumber: '142801-C1-U34',
    landBookNumber: '142801',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Immaculate apartment in Tractorul / Coresi masterplanned urban development. Strong performance across both long-term corporate rentals and weekend mountain tourist stays.',
    features: ['Mountain View', 'Balcony', 'Parking Space Included', 'Coresi Park & Mall', 'Smart Home'],
    diagnostics: {
      seismic: {
        riskClass: 'NEW_BUILD_SAFE',
        structuralType: 'Structură Cadre Beton Armat Proiectat Seism P100-1',
        groundAccelerationAg: 0.20,
        mortgageEligibility: 'FULL',
        provenance: {
          sourceName: 'Primăria Brașov Serviciul Urbanism',
          authority: 'Primăria Municipiului Brașov',
          endpointUrl: 'https://primariabrasov.ro',
          updateCadence: 'Monthly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'amccrs-seismic-list'
        }
      },
      flood: {
        level: 'NONE',
        catchmentBasin: 'Bazinul Hidrografic Olt / Pârâul Timiș-Triaj',
        provenance: {
          sourceName: 'Apele Române Hărți Hazard',
          authority: 'Administrația Bazinală Olt',
          endpointUrl: 'https://rowater.ro',
          updateCadence: 'Static/Official Regs',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'apele-romane-flood-hazard'
        }
      },
      heritage: {
        isMonument: false,
        renovationConstraints: 'None.',
        provenance: {
          sourceName: 'Registrul Monumentelor Istorice',
          authority: 'Institutul Național al Patrimoniului',
          endpointUrl: 'https://patrimoniu.ro',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
          reliability: 'Verified Official'
        }
      },
      airQuality: {
        aqi: 22,
        pm25: 7.2,
        pm10: 12.1,
        status: 'Good',
        nearestSensor: 'RNMCA RO018 (Brașov Triaj/Coresi)',
        provenance: {
          sourceName: 'Rețeaua Națională Calitatea Aerului',
          authority: 'Ministerul Mediului / RNMCA',
          endpointUrl: 'https://calitateaaerului.ro',
          updateCadence: 'Hourly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          reliability: 'Live Stream',
          datasetId: 'rnmca-air-quality'
        }
      },
      education: {
        nearestSchoolName: 'Colegiul Național „Dr. Ioan Meșotă”',
        schoolDistanceMeters: 1400,
        examAverageScore: 9.52,
        provenance: {
          sourceName: 'Ministerul Educației / data.gov.ro',
          authority: 'Ministerul Educației',
          endpointUrl: 'https://data.gov.ro/dataset/reteaua-unitatilor-de-invatamant-preuniversitar',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'data-gov-schools'
        }
      },
      mobility: {
        walkScore: 88,
        transitScore: 82,
        nearestMetroStation: 'RATBV Bus Line 15, 2, 9',
        metroDistanceMeters: 120,
        commuteToCityCenterMin: 15,
        provenance: {
          sourceName: 'RATBV Open Data',
          authority: 'Regia Autonomă de Transport Brașov',
          endpointUrl: 'https://ratbv.ro',
          updateCadence: 'Monthly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          reliability: 'Verified Official'
        }
      }
    },
    investment: {
      monthlyRentEstimateEur: 580,
      shortTermNightlyRateEur: 65,
      shortTermOccupancyPercent: 80,
      managementFeePercent: 12,
      estimatedRenovationCostEur: 0
    }
  },

  // 6. Ilfov / Pipera - Voluntari (Fast-Growing Suburban Expansion)
  {
    id: 'prop-if-01',
    title: 'Modern 3-Room Villa / Duplex in Pipera-Voluntari near International Schools',
    address: 'Strada Erou Iancu Nicolae 42, Voluntari, Ilfov',
    city: 'Ilfov',
    county: 'Ilfov',
    coordinates: [44.5021, 26.1284],
    priceEur: 235000,
    usableAreaSqm: 118,
    rooms: 4,
    floor: 1,
    totalFloors: 2,
    yearBuilt: 2021,
    cadastralNumber: '109842-C1',
    landBookNumber: '109842',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Contemporary family home in private gated community next to Băneasa Forest, British School of Bucharest and American International School.',
    features: ['Private Garden', '2 Parking Spots', 'Near International Schools', 'Băneasa Forest Walk', 'Heat Pump'],
    diagnostics: {
      seismic: {
        riskClass: 'NEW_BUILD_SAFE',
        structuralType: 'Cadre Beton Armat cu Zidărie Termoizolantă P100-1/2013',
        groundAccelerationAg: 0.30,
        mortgageEligibility: 'FULL',
        provenance: {
          sourceName: 'Consiliul Județean Ilfov / Urbanism',
          authority: 'CJ Ilfov / ANCPI Ilfov',
          endpointUrl: 'https://cjilfov.ro',
          updateCadence: 'Monthly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'amccrs-seismic-list'
        }
      },
      flood: {
        level: 'NONE',
        catchmentBasin: 'Bazinul Hidrografic Argeș-Vedea / Valea Saulei',
        provenance: {
          sourceName: 'Apele Române Hărți Hazard',
          authority: 'Administrația Bazinală Argeș-Vedea',
          endpointUrl: 'https://rowater.ro',
          updateCadence: 'Static/Official Regs',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'apele-romane-flood-hazard'
        }
      },
      heritage: {
        isMonument: false,
        renovationConstraints: 'None.',
        provenance: {
          sourceName: 'Registrul Monumentelor Istorice',
          authority: 'Institutul Național al Patrimoniului',
          endpointUrl: 'https://patrimoniu.ro',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
          reliability: 'Verified Official'
        }
      },
      airQuality: {
        aqi: 24,
        pm25: 8.1,
        pm10: 13.9,
        status: 'Good',
        nearestSensor: 'RNMCA RO008 (Băneasa Forest)',
        provenance: {
          sourceName: 'Rețeaua Națională Calitatea Aerului',
          authority: 'Ministerul Mediului / RNMCA',
          endpointUrl: 'https://calitateaaerului.ro',
          updateCadence: 'Hourly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          reliability: 'Live Stream',
          datasetId: 'rnmca-air-quality'
        }
      },
      education: {
        nearestSchoolName: 'Liceul Teoretic Internațional / Școala Gimnazială Voluntari',
        schoolDistanceMeters: 650,
        examAverageScore: 9.15,
        provenance: {
          sourceName: 'Ministerul Educației / data.gov.ro',
          authority: 'Ministerul Educației',
          endpointUrl: 'https://data.gov.ro/dataset/reteaua-unitatilor-de-invatamant-preuniversitar',
          updateCadence: 'Annually',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
          reliability: 'Verified Official',
          datasetId: 'data-gov-schools'
        }
      },
      mobility: {
        walkScore: 68,
        transitScore: 65,
        nearestMetroStation: 'Metrou Pipera (M2) - 5 min auto / Bus 459',
        metroDistanceMeters: 2400,
        commuteToCityCenterMin: 22,
        provenance: {
          sourceName: 'TPBI Transport București Ilfov',
          authority: 'Asociația de Dezvoltare Intercomunitară TPBI',
          endpointUrl: 'https://tpbi.ro',
          updateCadence: 'Monthly',
          lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          reliability: 'Verified Official'
        }
      }
    },
    investment: {
      monthlyRentEstimateEur: 1350,
      shortTermNightlyRateEur: 110,
      shortTermOccupancyPercent: 65,
      managementFeePercent: 10,
      estimatedRenovationCostEur: 0
    }
  }
];
