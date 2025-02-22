import styles from "./../src/styles/SegmentDistribution.module.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length && label) {
    return (
      <div className={styles.tooltipOverlap}>
        <p className={styles.labelOverlap}>{label}</p>

        <p>
          {" "}
          Unique sentence frequency:{" "}
          {Intl.NumberFormat("en", {
            notation: "compact",
          }).format(payload[0].value)}
        </p>
        <p>
          {" "}
          Duplicate sentence frequency:{" "}
          {Intl.NumberFormat("en", {
            notation: "compact",
          }).format(payload[1].value)}
        </p>
      </div>
    );
  }
};

export default function SegmentDistribution({ data, which }) {
  const DataFormater = (number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + "B";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + "M";
    } else if (number > 1000) {
      return (number / 1000).toString() + "K";
    } else {
      return number.toString();
    }
  };

  data.forEach((item) => {
    (item.freqFormatted = Intl.NumberFormat("en", {
      notation: "compact",
    }).format(item.freqFormatted)),
      (item.duplicatesFormatted = Intl.NumberFormat("en", {
        notation: "compact",
      }).format(item.duplicates));
  });

  const filteredData = data.filter((item) => item.token < 50);

  const finalBar = data.reduce((a, b) => (b.token >= 50 ? +a + +b.token : ""));

  const finalBarDupes = data.reduce((a, b) =>
    b.token >= 50 ? +a + +b.token : ""
  );

  filteredData.push({
    token: "50 + ",
    freq: finalBar,
    freqUnique: finalBar,
    freqFormatted: Intl.NumberFormat("en", {
      notation: "compact",
    }).format(finalBar),
    duplicates: finalBarDupes,
    duplicatesFormatted: Intl.NumberFormat("en", {
      notation: "compact",
    }).format(finalBarDupes),
  });

  return (
    <div
      className={[styles.segmentDistributionContainer, " custom-chart"].join(
        ""
      )}
    >
      <h3 className={styles.segmentHeader}>
        {which} segment lenght distribution
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={280}
          data={filteredData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 55,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="token" fontSize={12} tickMargin={5} />
          <YAxis tickFormatter={DataFormater} />
          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ outline: "none" }}
          />
          <Legend />
          <Bar
            dataKey="freqUnique"
            stackId="a"
            fill="#82ca9d"
            name="Unique sentence frequency"
          />
          <Bar
            dataKey="duplicates"
            stackId="a"
            fill="#0099DB"
            name="Duplicates"
            margin={{
              top: 0,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            {" "}
            {/* <LabelList
              dataKey="duplicatesFormatted"
              position="top"
              fontWeight={400}
              fontSize={10}
            /> */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
