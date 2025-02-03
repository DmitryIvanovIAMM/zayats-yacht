export interface DestinationDescription {
  _id: string;
  name: string;
  description: string;
  headerImageName: string;
  headerImageNameSm: string;
  mapImageName: string;
  mapImageNameSm: string;
  firstSectionTitle: string;
  firstSectionText?: string;
  firstSectionImageName: string;
  secondSectionTitle: string;
  secondSectionText?: string;
  secondSectionImageName: string;
  thirdSectionTitle?: string;
  thirdSectionText?: string;
  thirdSectionImageName?: string;
  lastImageName: string;
  sectionText: string;
}

export const DESTINATIONS: DestinationDescription[] = [
  {
    _id: '41224d776a326fb40f001101',
    name: 'Fort Lauderdale, Florida',
    description: 'Grand pre selling',
    headerImageName: 'lauderdaleHeader.jpg',
    headerImageNameSm: 'lauderdaleHeader_sm.jpg',
    mapImageName: 'lauderdaleMap.jpg',
    mapImageNameSm: 'lauderdaleMap_sm.jpg',
    firstSectionTitle: 'Exhibitors Profile',
    firstSectionImageName: 'lauderdaleFirstRow.jpg',
    secondSectionTitle: 'Exhibitors Profile',
    secondSectionImageName: 'lauderdaleSecondRow.jpg',
    thirdSectionTitle: 'Exhibitors Profile',
    lastImageName: 'lauderdaleLastSection.jpg',
    sectionText:
      'The exhibitors in the event Boat Show Palma are going to showcase more than 300 boats and there are going to be more than 500 exhibitors representing over 3,700 brands from 26 countries.'
  },
  {
    _id: '41224d776a326fb40f001102',
    name: 'Palma de Mallorca, Spain',
    description: 'Grand pre selling',
    headerImageName: 'palmaHeader.jpg',
    headerImageNameSm: 'palmaHeader_sm.jpg',
    mapImageName: 'palmaMap.jpg',
    mapImageNameSm: 'palmaMap_sm.jpg',
    firstSectionTitle: 'Palma de Mallorca',
    firstSectionText:
      'The capital of the island of Majorca is located in the bay of the same name and enjoys an excellent climate all year round (with an average annual temperature of 17.9° C).',
    firstSectionImageName: 'palmaFirstRow.jpg',
    secondSectionTitle: 'Superyacht Cup Palma 2020 17 - 20 Jun 2020',
    secondSectionText:
      "Renowned for being Europe's longest-running regatta, the Superyacht Cup Palma will return to the Balearic waters for four days of racing action this June.",
    secondSectionImageName: 'palmaSecondRow.jpg',
    lastImageName: 'palmaLastSection.jpg',
    sectionText:
      'The exhibitors in the event Boat Show Palma are going to showcase more than 300 boats and there are going to be more than 500 exhibitors representing over 3,700 brands from 26 countries.'
  },
  {
    _id: '41224d776a326fb40f001103',
    name: 'Genoa, Italy',
    description: 'Grand pre selling',
    headerImageName: 'genoaHeader.jpg',
    headerImageNameSm: 'genoaHeader_sm.jpg',
    mapImageName: 'genoaMap.jpg',
    mapImageNameSm: 'genoaMap_sm.jpg',
    firstSectionTitle: 'Exhibitors Profile',
    firstSectionImageName: 'genoaFirstRow.jpg',
    secondSectionTitle: 'Exhibitors Profile',
    secondSectionImageName: 'genoaSecondRow.jpg',
    thirdSectionTitle: 'Exhibitors Profile',
    lastImageName: 'genoaLastSection.jpg',
    sectionText:
      'The exhibitors in the event Boat Show Palma are going to showcase more than 300 boats and there are going to be more than 500 exhibitors representing over 3,700 brands from 26 countries.'
  },
  {
    _id: '41224d776a326fb40f001104',
    name: 'Fethiye, Turkey',
    description: 'Grand pre selling',
    headerImageName: 'fethiyeHeader.jpg',
    headerImageNameSm: 'fethiyeHeader_sm.jpg',
    mapImageName: 'fethiyeMap.jpg',
    mapImageNameSm: 'fethiyeMap_sm.jpg',
    firstSectionTitle: 'Exhibitors Profile',
    firstSectionImageName: 'fethiyeFirstRow.jpg',
    secondSectionTitle: 'Exhibitors Profile',
    secondSectionImageName: 'fethiyeSecondRow.jpg',
    thirdSectionTitle: 'Exhibitors Profile',
    lastImageName: 'fethiyeLastSection.jpg',
    sectionText:
      'The exhibitors in the event Boat Show Palma are going to showcase more than 300 boats and there are going to be more than 500 exhibitors representing over 3,700 brands from 26 countries.'
  },
  {
    _id: '41224d776a326fb40f001105',
    name: 'Hong Kong',
    description: 'Grand pre selling',
    headerImageName: 'hongKongHeader.jpg',
    headerImageNameSm: 'hongKongHeader_sm.jpg',
    mapImageName: 'hongKongMap.jpg',
    mapImageNameSm: 'hongKongMap_sm.jpg',
    firstSectionTitle: 'Exhibitors Profile',
    firstSectionImageName: 'hongKongFirstRow.jpg',
    secondSectionTitle: 'Exhibitors Profile',
    secondSectionImageName: 'hongKongSecondRow.jpg',
    thirdSectionTitle: 'Exhibitors Profile',
    lastImageName: 'hongKongLastSection.jpg',
    sectionText:
      'The exhibitors in the event Boat Show Palma are going to showcase more than 300 boats and there are going to be more than 500 exhibitors representing over 3,700 brands from 26 countries.'
  },
  {
    _id: '41224d776a326fb40f001106',
    name: 'Victoria, British Columbia',
    description: 'Grand pre selling',
    headerImageName: 'victoriaHeader.jpg',
    headerImageNameSm: 'victoriaHeader_sm.jpg',
    mapImageName: 'victoriaMap.jpg',
    mapImageNameSm: 'victoriaMap_sm.jpg',
    firstSectionTitle: 'Exhibitors Profile',
    firstSectionImageName: 'victoriaFirstRow.jpg',
    secondSectionTitle: 'Exhibitors Profile',
    secondSectionImageName: 'victoriaSecondRow.jpg',
    thirdSectionTitle: 'Exhibitors Profile',
    lastImageName: 'victoriaLastSection.jpg',
    sectionText:
      'The exhibitors in the event Boat Show Palma are going to showcase more than 300 boats and there are going to be more than 500 exhibitors representing over 3,700 brands from 26 countries.'
  },
  {
    _id: '41224d776a326fb40f001107',
    name: 'Ensenada, Mexico',
    description: 'Grand pre selling',
    headerImageName: 'ensenadaHeader.jpg',
    headerImageNameSm: 'ensenadaHeader_sm.jpg',
    mapImageName: 'ensenadaMap.jpg',
    mapImageNameSm: 'ensenadaMap_sm.jpg',
    firstSectionTitle: 'Exhibitors Profile',
    firstSectionImageName: 'ensenadaFirstRow.jpg',
    secondSectionTitle: 'Exhibitors Profile',
    secondSectionImageName: 'ensenadaSecondRow.jpg',
    thirdSectionTitle: 'Exhibitors Profile',
    lastImageName: 'ensenadaLastSection.jpg',
    sectionText:
      'The exhibitors in the event Boat Show Palma are going to showcase more than 300 boats and there are going to be more than 500 exhibitors representing over 3,700 brands from 26 countries.'
  },
  {
    _id: '41224d776a326fb40f001108',
    name: 'Golfito, Costa Rica',
    description: 'Grand pre selling',
    headerImageName: 'golfitoHeader.jpg',
    headerImageNameSm: 'golfitoHeader_sm.jpg',
    mapImageName: 'golfitoMap.jpg',
    mapImageNameSm: 'golfitoMap_sm.jpg',
    firstSectionTitle: 'Exhibitors Profile',
    firstSectionImageName: 'golfitoFirstRow.jpg',
    secondSectionTitle: 'Exhibitors Profile',
    secondSectionImageName: 'golfitoSecondRow.jpg',
    thirdSectionTitle: 'Exhibitors Profile',
    lastImageName: 'golfitoLastSection.jpg',
    sectionText:
      'The exhibitors in the event Boat Show Palma are going to showcase more than 300 boats and there are going to be more than 500 exhibitors representing over 3,700 brands from 26 countries.'
  },
  {
    _id: '41224d776a326fb40f001109',
    name: 'Tortola, British Virgin Islands',
    description: 'Grand pre selling',
    headerImageName: 'tortolaHeader.jpg',
    headerImageNameSm: 'tortolaHeader_sm.jpg',
    mapImageName: 'tortolaMap.jpg',
    mapImageNameSm: 'tortolaMap_sm.jpg',
    firstSectionTitle: 'Exhibitors Profile',
    firstSectionImageName: 'tortolaFirstRow.jpg',
    secondSectionTitle: 'Exhibitors Profile',
    secondSectionImageName: 'tortolaSecondRow.jpg',
    thirdSectionTitle: 'Exhibitors Profile',
    lastImageName: 'tortolaLastSection.jpg',
    sectionText:
      'The exhibitors in the event Boat Show Palma are going to showcase more than 300 boats and there are going to be more than 500 exhibitors representing over 3,700 brands from 26 countries.'
  }
];
