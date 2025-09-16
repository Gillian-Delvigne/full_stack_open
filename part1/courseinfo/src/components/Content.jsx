import { Part } from "./Part";

export const Content = ({first, second, third}) => {
    return (
        <div>
            <Part part={first.part} exercises={first.exercises} />
            <Part part={second.part} exercises={second.exercises} />
            <Part part={third.part} exercises={third.exercises} />
        </div>
    );
};
