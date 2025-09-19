import { EmptyTechnologies } from "..";
import { Welcome, Technologies } from "..";
import { getAllTechnology } from "@/lib/API/techAPI/getAllTech"

const Home = async () => {

  try {
    const technology = await getAllTechnology();
  
    const isTechnologyNotEmpty = Array.isArray(technology) && technology.length > 0

    return isTechnologyNotEmpty ? <>
      <Welcome />
      <Technologies technology={technology} />
    </> : <EmptyTechnologies />

  } catch (error) {
    console.log(error)
    return <EmptyTechnologies />
  }
};

export default Home;
