import React from 'react';

/* Styles added by individual stories */
import Button from './Button/Button';
import CheckBox from './CheckBox/CheckBox';
import RadioButton from './RadioButton/RadioButton';
import Select from './Select/Select';
import TextArea from './TextArea/TextArea';
import TextField from './TextField/TextField';

export default {
  title: 'Form',
};

const options = [
  {
    key: 0,
    label: 'Eagle',
  },
  {
    key: 1,
    label: 'Hawk',
    disabled: true,
  },
  {
    key: 2,
    label: 'Owl',
  },
];

export const basic = () => (
  <form className="tu-grid">
    <TextField label="Text field" />
    <Select label="Select field" options={options} />
    <TextArea label="Text area" />
    <fieldset>
      <legend>What matches you the best?</legend>
      <div className="tu-grid style-start layout-no-margin" tu-columns="3" tu-columns-md="6">
        <RadioButton label="Eagle" name="bird" />
        <RadioButton label="Hawk" name="bird" />
        <RadioButton label="Owl" name="bird" />
      </div>
    </fieldset>
    <fieldset>
      <legend>Favorite birds?</legend>
      <div className="tu-grid style-start layout-no-margin" tu-columns="3" tu-columns-md="6">
        <CheckBox label="Cockatoo" />
        <CheckBox label="Macaw" />
        <CheckBox label="Parakeet" />
      </div>
    </fieldset>
    <menu className="tu-grid style-end" tu-columns="3" tu-columns-md="6" style={{ textAlign: 'right' }}>
      <Button type="link" href="#" className="secondary">
        Terms
      </Button>
      <Button type="reset">Reset</Button>
      <Button type="submit" className="primary">
        Submit
      </Button>
    </menu>
  </form>
);
