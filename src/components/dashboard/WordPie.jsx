import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#10B981", "#FBCFE8"];

const WordPie = (props) => {
  return (
    <div className="flex flex-col items-center">
      <PieChart width={100} height={100}>
        <Pie
          data={props.data}
          labelLine={false}
          startAngle={-270}
          isAnimationActive={false}
          fill="#8884d8"
          dataKey="value"
        >
          {props.data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              strokeWidth={0}
            />
          ))}
        </Pie>
      </PieChart>
      <p className="-m-2">{props.word}</p>
    </div>
  );
};

export default WordPie;
