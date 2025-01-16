import { moneyFormatter } from './moneyFormatter';

/* eslint-disable no-console */
export function getQuoteRequestEmail(quoteRequest: any) {
  const subject = getQuoteEmailSubject(quoteRequest);
  const messageText = getQuoteRequestEmailText(quoteRequest);
  const html = getQuoteRequestEmailHTMLBody(quoteRequest);
  const alliedOceanEmail = getQuoteRequestDestinationEmail();
  console.log(`alliedOceanEmail: ${alliedOceanEmail}`);
  console.log(`quoteRequest.email: ${quoteRequest.email}`);

  return {
    from: process.env.ALLIED_SALES_EMAIL as string,
    to: alliedOceanEmail,
    subject: subject,
    text: messageText,
    html: html
  };
}

export function getQuoteEmailSubject(quoteRequest: any) {
  return quoteRequest.yachtModel && quoteRequest.yachtModel.length > 0
    ? `New Quote Request from ${quoteRequest.firstName} ${quoteRequest.lastName} for ${quoteRequest.yachtModel}`
    : `New Quote Request from ${quoteRequest.firstName} ${quoteRequest.lastName}`;
}

export function getQuoteRequestDestinationEmail() {
  return process.env.ALLIED_SALES_EMAIL as string;
}

export function getQuoteRequestEmailText(quoteRequest: any) {
  return (
    `Yacht Name: ${quoteRequest.yachtName}\n` +
    `Name: ${quoteRequest.firstName} ${quoteRequest.lastName}\n` +
    `Phone: ${quoteRequest.phoneNumber}\n` +
    `Email: ${quoteRequest.email}\n` +
    `Best Time to Contact: ${
      quoteRequest.bestTimeToContact ? quoteRequest.bestTimeToContact : '-'
    }\n` +
    `Yacht Make and Model: ${quoteRequest.yachtModel ? quoteRequest.yachtModel : '-'}\n` +
    `Insured Value in USD: ${
      quoteRequest.insuredValue ? moneyFormatter(quoteRequest.insuredValue) : '-'
    }\n` +
    `Length: ${
      quoteRequest.length ? quoteRequest.length.concat(' ' + quoteRequest.lengthUnit) : '-'
    }\n` +
    `Beam: ${quoteRequest.beam ? quoteRequest.beam.concat(' ' + quoteRequest.beamUnit) : '-'}\n` +
    `Weight: ${
      quoteRequest.weight ? quoteRequest.weight.concat(' ' + quoteRequest.weightUnit) : '-'
    }\n` +
    `Purpose of Transport: ${quoteRequest.purpose ? quoteRequest.purpose : '-'}\n` +
    `Form Where: ${quoteRequest.fromWhere ? quoteRequest.fromWhere : '-'}\n` +
    `To Where: ${quoteRequest.toWhere ? quoteRequest.toWhere : '-'}\n` +
    `When: ${quoteRequest.when ? quoteRequest.when : '-'}\n` +
    `Notes: ${quoteRequest.notes ? quoteRequest.notes : '-'}`
  );
}

export function getQuoteRequestEmailHTMLBody(quoteRequest: any) {
  console.log('getQuoteRequestEmailHTMLBody().  quoteRequest: ', quoteRequest);
  return (
    '<table>' +
    `<tr><td><strong>Yacht Name :</strong></td><td>&nbsp;${
      quoteRequest.yachtName ? quoteRequest.yachtName : '-'
    }</td></tr>` +
    `<tr><td><strong>Name :</strong></td><td>&nbsp;${quoteRequest.firstName} ${quoteRequest.lastName}</td></tr>` +
    `<tr><td><strong>Phone :</strong></td><td>&nbsp;${quoteRequest.phoneNumber}</td></tr>` +
    `<tr><td><strong>Email :</strong></td><td>&nbsp;${quoteRequest.email}</td></tr>` +
    `<tr><td><strong>Best Time to Contact :</strong></td><td>&nbsp;${
      quoteRequest.bestTimeToContact ? quoteRequest.bestTimeToContact : '-'
    }</td></tr>` +
    `<tr><td><strong>Yacht Make and Model :</strong></td><td>&nbsp;${
      quoteRequest.yachtModel ? quoteRequest.yachtModel : '-'
    }</td></tr>` +
    `<tr><td><strong>Insured Value in USD :</strong></td><td>&nbsp;${
      quoteRequest.insuredValue ? moneyFormatter(quoteRequest.insuredValue) : '-'
    }</td></tr>` +
    `<tr><td><strong>Length :</strong></td><td>&nbsp;${
      quoteRequest.length ? quoteRequest.length.concat(' ' + quoteRequest.lengthUnit) : '-'
    }</td></tr>` +
    `<tr><td><strong>Beam :</strong></td><td>&nbsp;${
      quoteRequest.beam ? quoteRequest.beam.concat(' ' + quoteRequest.beamUnit) : '-'
    }</td></tr>` +
    `<tr><td><strong>Weight :</strong></td><td>&nbsp;${
      quoteRequest.weight ? quoteRequest.weight.concat(' ' + quoteRequest.weightUnit) : '-'
    }</td></tr>` +
    `<tr><td><strong>Purpose of Transport :</strong></td><td>&nbsp;${
      quoteRequest.purpose ? quoteRequest.purpose : '-'
    }</td></tr>` +
    `<tr><td><strong>Form Where :</strong></td><td>&nbsp;${
      quoteRequest.fromWhere ? quoteRequest.fromWhere : '-'
    }</td></tr>` +
    `<tr><td><strong>To Where :</strong></td><td>&nbsp;${
      quoteRequest.toWhere ? quoteRequest.toWhere : '-'
    }</td></tr>` +
    `<tr><td><strong>When :</strong></td><td>&nbsp;${
      quoteRequest.when ? quoteRequest.when : '-'
    }</td></tr>` +
    `<tr><td><strong>Notes :</strong></td><td>&nbsp;${
      quoteRequest.notes ? quoteRequest.notes : '-'
    }</td></tr>` +
    '</table>'
  );
}
