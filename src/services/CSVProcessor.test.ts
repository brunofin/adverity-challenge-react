import CSVProcessor from "./CSVProcessor";

it('Parses a CSV file with data', () => {
  const csv = `Date,Datasource,Campaign,Clicks,Impressions
  01.01.2019,Facebook Ads,Like Ads,274,1979
  01.01.2019,Facebook Ads,Offer Campaigns - Conversions,10245,764627
  01.01.2019,Google Adwords,B2B - Leads,7,444`;

  const result = CSVProcessor.parse(csv);

  console.log(result);
});
