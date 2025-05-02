import * as ids from './ids';

const montAgo = new Date().setMonth(new Date().getMonth() - 3);
const montAgoDate = new Date(montAgo);

export const REGULAR_SHIP_STOPS_2020 = [
  {
    _id: '41224d776a326fb40f022210',
    sailingId: ids.grandPrixSailingId,
    portId: ids.fortLauderdalePortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: montAgoDate,
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 4)),
    miles: 0,
    daysAtSea: 0,
    daysInPort: 4
  },
  {
    _id: '41224d776a326fb40f022211',
    sailingId: ids.grandPrixSailingId,
    portId: ids.palmaDeMallorcaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 18)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 20)),
    miles: 4262,
    daysAtSea: 14,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022212',
    sailingId: ids.grandPrixSailingId,
    portId: ids.genoaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 21)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 24)),
    miles: 441,
    daysAtSea: 1,
    daysInPort: 3
  },
  {
    _id: '41224d776a326fb40f022213',
    sailingId: ids.summerMediterraneanSailingId,
    portId: ids.fortLauderdalePortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 37)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 42)),
    miles: 4659,
    daysAtSea: 16,
    daysInPort: 5
  },
  {
    _id: '41224d776a326fb40f022214',
    sailingId: ids.summerMediterraneanSailingId,
    portId: ids.palmaDeMallorcaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 56)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 58)),
    miles: 4262,
    daysAtSea: 14,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022215',
    sailingId: ids.summerMediterraneanSailingId,
    portId: ids.genoaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 59)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 63)),
    miles: 441,
    daysAtSea: 1,
    daysInPort: 4
  },
  {
    _id: '41224d776a326fb40f022216',
    sailingId: ids.summerMediterraneanSailingId,
    portId: ids.fethiyePortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 67)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 70)),
    miles: 1169,
    daysAtSea: 4,
    daysInPort: 3
  },
  {
    _id: '41224d776a326fb40f022217',
    sailingId: ids.europeToAsiaSailingId,
    portId: ids.hongKongPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 93)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 95)),
    miles: 6843,
    daysAtSea: 23,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022218',
    sailingId: ids.asiaToNorthAmericaSummerSailingId,
    portId: ids.victoriaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 114)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 116)),
    miles: 5680,
    daysAtSea: 19,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022219',
    sailingId: ids.northAmericaEastboundSummerSailingId,
    portId: ids.ensenadaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 120)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 122)),
    miles: 1201,
    daysAtSea: 4,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022220',
    sailingId: ids.northAmericaEastboundSummerSailingId,
    portId: ids.golfitoPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 130)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 132)),
    miles: 2494,
    daysAtSea: 8,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022221',
    sailingId: ids.northAmericaEastboundSummerSailingId,
    portId: ids.fortLauderdalePortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 137)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 138)),
    miles: 1605,
    daysAtSea: 5,
    daysInPort: 1
  },
  {
    _id: '41224d776a326fb40f022222',
    sailingId: ids.fortLauderdaleBoatShowSailingId,
    portId: ids.genoaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 170)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 172)),
    miles: 4659,
    daysAtSea: 32,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022223',
    sailingId: ids.fortLauderdaleBoatShowSailingId,
    portId: ids.palmaDeMallorcaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 173)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 177)),
    miles: 441,
    daysAtSea: 1,
    daysInPort: 4
  },
  {
    _id: '41224d776a326fb40f022224',
    sailingId: ids.fortLauderdaleBoatShowSailingId,
    portId: ids.fortLauderdalePortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 191)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 193)),
    miles: 4262,
    daysAtSea: 14,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022225',
    sailingId: ids.christmasSailingId,
    portId: ids.genoaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 209)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 212)),
    miles: 4659,
    daysAtSea: 16,
    daysInPort: 3
  },
  {
    _id: '41224d776a326fb40f022226',
    sailingId: ids.christmasSailingId,
    portId: ids.palmaDeMallorcaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 213)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 215)),
    miles: 441,
    daysAtSea: 1,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022227',
    sailingId: ids.christmasSailingId,
    portId: ids.tortolaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 228)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 231)),
    miles: 3757,
    daysAtSea: 13,
    daysInPort: 3
  },
  {
    _id: '41224d776a326fb40f022228',
    sailingId: ids.westboundNorthAmericaAndAsiaChristmasSailingId,
    portId: ids.fortLauderdalePortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 234)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 239)),
    miles: 974,
    daysAtSea: 3,
    daysInPort: 5
  },
  {
    _id: '41224d776a326fb40f022229',
    sailingId: ids.westboundNorthAmericaAndAsiaChristmasSailingId,
    portId: ids.golfitoPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 244)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 246)),
    miles: 1600,
    daysAtSea: 5,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022230',
    sailingId: ids.westboundNorthAmericaAndAsiaChristmasSailingId,
    portId: ids.ensenadaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 254)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 256)),
    miles: 2500,
    daysAtSea: 8,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022231',
    sailingId: ids.westboundNorthAmericaAndAsiaChristmasSailingId,
    portId: ids.victoriaPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 260)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 262)),
    miles: 1200,
    daysAtSea: 4,
    daysInPort: 2
  },
  {
    _id: '41224d776a326fb40f022232',
    sailingId: ids.westboundNorthAmericaAndAsiaChristmasSailingId,
    portId: ids.hongKongPortId,
    shipId: ids.industrialGuideShipId,
    arrivalOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 281)),
    departureOn: new Date(montAgoDate.setDate(montAgoDate.getDate() + 283)),
    miles: 5680,
    daysAtSea: 19,
    daysInPort: 2
  }
];
