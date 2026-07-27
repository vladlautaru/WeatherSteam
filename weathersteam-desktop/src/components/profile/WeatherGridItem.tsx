import { Box, SvgIconTypeMap, Tooltip, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface WeatherGridItemProps {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  tooltipLabel: string;
  value: number | boolean | string;
  measureUnit: string | '';
}

export default function WeatherGridItem(props: WeatherGridItemProps) {
  const displayMeasureUnit = (measureUnit: string) => {
    switch (measureUnit) {
      case 'celsius': {
        return '°C';
      }
      case 'fahrenheit': {
        return '°F';
      }
      case 'kmh': {
        return 'km/h';
      }
      default:
        return measureUnit;
    }
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography
        variant="h4"
        component="div"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Tooltip title={props.tooltipLabel}>
          <props.icon />
        </Tooltip>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <span>{props.value}</span>
          <span>{displayMeasureUnit(props.measureUnit)}</span>
        </Box>
      </Typography>
    </Box>
  );
}
