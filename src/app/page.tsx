import { Welcome, Technologies } from "..";
import { getAllTechnology } from "@/lib/API/techAPI/getAllTech";
import { EmptyTechnologies } from "..";


const Home = async () => {

  try {
    const technology = await getAllTechnology();
    // throw new Error("testing error")
    const isTechnologyEmpty = (Array.isArray(technology) && technology.length <= 0)

    return isTechnologyEmpty ? <EmptyTechnologies /> : <>
      <Welcome />
      <Technologies technology={technology} />
    </>

  } catch (error) {
    return <EmptyTechnologies />
  }
};

export default Home;
