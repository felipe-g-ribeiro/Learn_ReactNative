import { FilterStatus } from "@/types/FilterStatus";
import {CircleDashed, CircleCheck} from "lucide-react-native"
import { Filter } from "react-native-svg";

export function StatusIcon({status} : {status: FilterStatus}){
    return status === FilterStatus.DONE ? (
        <CircleCheck size={18} color={"#2C46B1"} />
    ) : (
         <CircleCheck size={18} color={"#000000"}  />
    )
}