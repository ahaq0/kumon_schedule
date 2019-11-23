//Since typescript messes with parcel looking at files that aren't js or tsx, I have this code here to ignore the error
// it will give when importing non js or tsx files

declare module "*.jpg";
declare module "*.png";
