
import { Stack, Box } from "@chakra-ui/react";
import React from 'react';
import { Interval } from 'types'
import { zoneColors  } from 'shared';

interface ZoneGraphProps {
  intervals: Interval[];
  timeInSeconds: number;
};

const defaultProps = {
  intervals: [],
  timeInSeconds: 0
}

export const ZoneGraph = ({ intervals, timeInSeconds }: ZoneGraphProps = defaultProps) => (
  <Stack
    direction="row"
    spacing={1}
    d="flex"
    align="flex-end"
    h={50}
    data-testid="interval-zone-chart"
  >
    {
      intervals.map((interval, index) => (
        <Box
          key={index}
          bg={zoneColors[parseInt(interval.zone)]}
          h={`${(parseInt(interval.zone) / 7) * 100}%`}
          w={`${((interval.length) / timeInSeconds) * 100}%`}
          data-testid="interval-chart-bar"
        />
      ))
    }
  </Stack>
);