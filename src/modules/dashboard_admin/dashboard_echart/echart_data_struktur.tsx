import React, { useState } from 'react';
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { useShallowEffect } from '@mantine/hooks';

function EchartDataStruktur() {
  const [options, setOptions] = useState<EChartsOption>({})

  useShallowEffect(() => {
    loadData()
  },[])

  const loadData = () => {
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {

        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'DATA STRUKTUR',
          type: 'pie',
          radius: '60%',
          data: [
            { value: 1048, name: 'Konfirmasi User', },
            { value: 735, name: 'Data Struktur Organisasi' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            }
          }
        }
      ]
    };
    setOptions(option)
  }

  return (
    <div>
      <EChartsReact style={{ height: 300 }} option={options}/>
    </div>
  );
}

export default EchartDataStruktur;
