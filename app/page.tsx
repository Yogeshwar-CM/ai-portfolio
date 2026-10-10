import { readFileSync } from "node:fs";
import { join } from "node:path";
import PortfolioInteractions from "./portfolio-interactions";

const source = readFileSync(join(process.cwd(), "index.html"), "utf8");
const styles = source.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
const body = (source.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? "").replace(/<script>[\s\S]*?<\/script>/, "");
const profileSchema = {"@context":"https://schema.org","@type":"ProfilePage",mainEntity:{"@type":"Person",name:"Yogeshwar CM",jobTitle:"AI systems builder",description:"I build internal tools and AI automations for individuals, founders, and teams.",email:"mailto:cmyogeshwar@gmail.com",sameAs:["https://www.linkedin.com/in/yogeshwar-cm/"],knowsAbout:["Internal tools","Business process automation","CRM automation","Voice agents","Sales training agents","Document parsing"]}};

export default function Home() {
  return <><style dangerouslySetInnerHTML={{ __html: styles }} /><div dangerouslySetInnerHTML={{ __html: body }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} /><PortfolioInteractions /></>;
}
