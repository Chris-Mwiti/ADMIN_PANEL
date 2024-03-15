import { Loader } from "lucide-react";
import { Button } from "../ui/button";

interface ICreateButtonProp { 
    isPending:boolean;
    children?:React.ReactElement;
}
const CreateButton = (props: ICreateButtonProp) => {
  return (
    <Button type="submit" className="bg-slate-100" disabled={props.isPending}>
      {props.isPending ? (
        <>
          <Loader className="animate-pulse mr-2 s size-4" />
          Creating ...
        </>
      ) : (
        "Create"
      )}
    </Button>
  );
}

export default CreateButton