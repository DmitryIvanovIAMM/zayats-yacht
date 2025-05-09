import * as ids from './ids';
import { REGULAR_SHIP_STOPS_2020 } from './regularShipStops_2020';
import { ALASKA_YACHTING_SHIP_STOPS_2020 } from './alaskaYachtingAdventure_2020';
import { Types } from 'mongoose';

export const USERS = [
  {
    _id: new Types.ObjectId('6809ea399a784e46a366d780'),
    name: 'Dmytro Ivanov',
    email: 'dmitry.ivanov.iamm@gmail.com',
    role: 'admin',
    //hashedPassword: '$2b$10$mT2ICCTqkmWzT4SRPlG6A.u87WTSvGWSU6aYEUD1Fv5B0Nqd7ry9q', // Zayats123
    hashedPassword: '$2b$10$9C3tM1F.mfZP.Q492ai2aOPMu3duSoLqgy0go/f4qz2REwbVmQx9q', // Yacht123
    salt: 10,
    isActive: true,
    emailValidated: true,
    createdAt: '2025-04-24T07:37:29.411+00:00',
    updatedAt: '2025-04-24T07:37:29.411+00:00'
  },
  {
    _id: new Types.ObjectId('41224d776a326fb40f000003'),
    name: 'Customer2',
    email: 'customer2@email.com',
    role: 'user',
    hashedPassword: '$2b$10$9C3tM1F.mfZP.Q492ai2aOPMu3duSoLqgy0go/f4qz2REwbVmQx9q',
    salt: 10,
    isActive: true,
    emailValidated: false,
    createdAt: '2025-04-24T07:37:29.411+00:00',
    updatedAt: '2025-04-24T07:37:29.411+00:00'
  },
  {
    _id: new Types.ObjectId('41224d776a326fb40f000004'),
    name: 'Customer3',
    email: 'customer3@email.com',
    role: 'user',
    hashedPassword: '$2b$10$9C3tM1F.mfZP.Q492ai2aOPMu3duSoLqgy0go/f4qz2REwbVmQx9q',
    salt: 10,
    isActive: true,
    emailValidated: false,
    createdAt: '2025-04-24T07:37:29.411+00:00',
    updatedAt: '2025-04-24T07:37:29.411+00:00'
  },
  {
    _id: new Types.ObjectId('41224d776a326fb40f000005'),
    name: 'Customer4',
    email: 'customer4@email.com',
    role: 'user',
    hashedPassword: '$2b$10$9C3tM1F.mfZP.Q492ai2aOPMu3duSoLqgy0go/f4qz2REwbVmQx9q',
    salt: 10,
    isActive: true,
    emailValidated: false,
    createdAt: '2025-04-24T07:37:29.411+00:00',
    updatedAt: '2025-04-24T07:37:29.411+00:00'
  },
  {
    _id: new Types.ObjectId('6809ea399a784e46a366d791'),
    name: 'Yacht Admin',
    email: 'yacht.admin@gmail.com',
    role: 'admin',
    hashedPassword: '$2b$10$9C3tM1F.mfZP.Q492ai2aOPMu3duSoLqgy0go/f4qz2REwbVmQx9q', // Yacht123
    salt: 10,
    isActive: true,
    emailValidated: true,
    createdAt: '2025-04-24T07:37:29.411+00:00',
    updatedAt: '2025-04-24T07:37:29.411+00:00'
  }
];

export const SHIPS = [
  {
    _id: ids.industrialGuideShipId,
    name: 'INDUSTRIAL GUIDE',
    type: 'Heavy Lift Vessel',
    builder: 'Hudong',
    flag: 'Liberia',
    homePort: 'Monrovia',
    class: 'GL + 100 A 5 E 3',
    imoNo: '9424572',
    callSign: 'A8XD3'
  },
  {
    _id: ids.mVIndustrialGraceShipId,
    name: 'MV Industrial Grace',
    type: 'Heavy Lift Vessel',
    builder: 'Hudong',
    flag: 'Liberia',
    homePort: 'Monrovia',
    class: 'GL + 100 A 5 E 3',
    imoNo: '9424572',
    callSign: 'A8XD3'
  }
];

export const PORTS = [
  {
    _id: ids.fortLauderdalePortId,
    portName: 'Fort Lauderdale, Florida',
    destinationName: 'East Coast North America',
    imageFileName: 'FortLauderdale.jpg'
  },
  {
    _id: ids.palmaDeMallorcaPortId,
    portName: 'Palma de Mallorca, Spain',
    destinationName: 'Mediterranean',
    imageFileName: 'PalmaDeMallorca.jpg'
  },
  {
    _id: ids.genoaPortId,
    portName: 'Genoa, Italy',
    destinationName: 'Mediterranean',
    imageFileName: 'Genoa.jpg'
  },
  {
    _id: ids.fethiyePortId,
    portName: 'Fethiye, Turkey',
    destinationName: 'Mediterranean',
    imageFileName: 'FethiyeTurkey.jpg'
  },
  {
    _id: ids.hongKongPortId,
    portName: 'Hong Kong',
    destinationName: 'Asia',
    imageFileName: 'HongKong.jpg'
  },
  {
    _id: ids.victoriaPortId,
    portName: 'Victoria, British Columbia',
    destinationName: 'West Coast North America',
    imageFileName: 'Victoria.jpg'
  },
  {
    _id: ids.ensenadaPortId,
    portName: 'Ensenada, Mexico',
    destinationName: 'West Coast North America',
    imageFileName: 'Ensenada.jpg'
  },
  {
    _id: ids.golfitoPortId,
    portName: 'Golfito, Costa Rica',
    destinationName: 'Central America',
    imageFileName: 'Golfito.jpg'
  },
  {
    _id: ids.tortolaPortId,
    portName: 'Tortola, British Virgin Islands',
    destinationName: 'Caribbean',
    imageFileName: 'Tortola.jpg'
  },
  {
    _id: ids.colonPortId,
    portName: 'Colon, Panama',
    destinationName: 'Central America',
    imageFileName: 'Colon.jpg'
  },
  {
    _id: ids.palmBeachPortId,
    portName: 'Palm Beach, Florida',
    destinationName: 'East Coast North America',
    imageFileName: 'PalmBeach.jpg'
  },
  {
    _id: ids.laPazPortId,
    portName: 'La Paz, Mexico',
    destinationName: 'West Coast North America',
    imageFileName: 'LaPaz.jpg'
  }
];

export const SHIP_STOPS = [...REGULAR_SHIP_STOPS_2020, ...ALASKA_YACHTING_SHIP_STOPS_2020];

export const QUOTE_REQUESTS = [
  {
    _id: new Types.ObjectId('68172cdb804ec21af191d52d'),
    fromUserId: USERS[1]._id,
    fromName: USERS[1].name,
    fromEmail: USERS[1].email,
    receivedAt: '5/4/2025, 12:01:15 PM',
    requestData:
      'Yacht Name: Supper-Pupper_2\nName: Customer2\nPhone: 6106600010\nEmail: customer2@email.com\nBest Time to Contact: -\nYacht Make and Model: -\nInsured Value in USD: -\nLength: -\nBeam: -\nWeight: -\nPurpose of Transport: -\nForm Where: -\nTo Where: -\nWhen: -\nNotes: -',
    requestObject: {
      yachtName: 'Supper-Pupper_2',
      name: USERS[1].name,
      phone: '6106600010',
      email: USERS[1].email,
      bestTimeToContact: '-',
      yachtMakeAndModel: '-',
      insuredValueInUSD: '-',
      length: '-',
      beam: '-',
      weight: '-',
      purposeOfTransport: '-',
      formWhere: '-',
      toWhere: '-',
      when: '-',
      notes: '-'
    }
  },
  {
    _id: new Types.ObjectId('68172cdb804ec21af191d52e'),
    fromUserId: USERS[2]._id,
    fromName: USERS[2].name,
    fromEmail: USERS[2].email,
    receivedAt: '5/4/2025, 12:01:14 PM',
    requestData:
      'Yacht Name: Supper-Pupper_3\nName: Customer3\nPhone: 6106600011\nEmail: cutomer3@gmailcom\nBest Time to Contact: -\nYacht Make and Model: -\nInsured Value in USD: -\nLength: -\nBeam: -\nWeight: -\nPurpose of Transport: -\nForm Where: -\nTo Where: -\nWhen: -\nNotes: -',
    requestObject: {
      yachtName: 'Supper-Pupper_3',
      name: USERS[2].name,
      phone: '6106600011',
      email: USERS[2].email,
      bestTimeToContact: '-',
      yachtMakeAndModel: '-',
      insuredValueInUSD: '-',
      length: '-',
      beam: '-',
      weight: '-',
      purposeOfTransport: '-',
      formWhere: '-',
      toWhere: '-',
      when: '-',
      notes: '-'
    }
  },
  {
    _id: new Types.ObjectId('68172cdb804ec21af191d52f'),
    fromUserId: USERS[3]._id,
    fromName: USERS[3].name,
    fromEmail: USERS[3].email,
    receivedAt: '5/4/2025, 12:01:13 PM',
    requestData:
      'Yacht Name: Supper-Pupper_4\nName: Customer4\nPhone: 6106600012\nEmail: customer4@gmailcom\nBest Time to Contact: -\nYacht Make and Model: -\nInsured Value in USD: -\nLength: -\nBeam: -\nWeight: -\nPurpose of Transport: -\nForm Where: -\nTo Where: -\nWhen: -\nNotes: -',
    requestObject: {
      yachtName: 'Supper-Pupper_4',
      name: USERS[3].name,
      phone: '6106600012',
      email: USERS[3].email,
      bestTimeToContact: '-',
      yachtMakeAndModel: '-',
      insuredValueInUSD: '-',
      length: '-',
      beam: '-',
      weight: '-',
      purposeOfTransport: '-',
      formWhere: '-',
      toWhere: '-',
      when: '-',
      notes: '-'
    }
  }
];
