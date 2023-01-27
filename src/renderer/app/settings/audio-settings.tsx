import React, { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';

import { DEFAULT_SETTINGS, Settings } from '../../../models/settings';
import { FieldSet, FormGroup, Label, Legend, RangeInput, RangeValue, Row } from './settings-style';

export const AudioSettings: FunctionComponent = () => {
  const { register, watch } = useFormContext<Settings>();
  const volumeIncrementWatch = watch('volumeIncrement');
  const skipSongDelayWatch = watch('skipSongDelay');

  return (
    <FieldSet>
      <Legend>Audio</Legend>
      <FormGroup>
        <Row>
          <Label>
            Volume increment
            <RangeInput
              type="range"
              min={2}
              max={100}
              step={2}
              defaultValue={DEFAULT_SETTINGS.volumeIncrement}
              {...register('volumeIncrement', { required: true, valueAsNumber: true })}
            />
            <RangeValue>{volumeIncrementWatch}</RangeValue>
          </Label>
        </Row>
        <Row>
          <Label>
            Skip length (seconds)
            <RangeInput
              type="range"
              min={5}
              max={60}
              step={5}
              defaultValue={DEFAULT_SETTINGS.skipSongDelay}
              {...register('skipSongDelay', { required: true, valueAsNumber: true })}
            />
            <RangeValue>{skipSongDelayWatch}</RangeValue>
          </Label>
        </Row>
      </FormGroup>
    </FieldSet>
  );
};
