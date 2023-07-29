import { useShallowEffect } from '@mantine/hooks';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';
import React, { useState } from 'react';

function EchartInformasi() {
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
          name: 'INFORMASI',
          type: 'pie',
          radius: '60%',
          data: [
            { value: 1048, name: 'Halaman Berita', },
            { value: 735, name: 'Halaman Pengumuman' },
            { value: 900, name: 'Halaman Galeri' },
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

export default EchartInformasi;
