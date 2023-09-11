import { getGeneralProjectData } from "@/utils/api";
import DataInfo from "./dataInfo-section";

const GeneralProjectData = async () => {
  const dataInfo = await getGeneralProjectData();

  return <DataInfo dataInfo={dataInfo} />;
};

export default GeneralProjectData;
