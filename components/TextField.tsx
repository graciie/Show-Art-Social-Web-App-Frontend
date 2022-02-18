import React from 'react';
import { NextPage } from 'next';
import classNames from 'classnames';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  helper?: string;
  error?: string | string[];
}

const getClasses = ({ className, error }: TextFieldProps) => {
  return classNames({
    input: !className?.match(/input(\s|$)/),
    [className || '']: true,
    'input-error': !!error,
  });
};

type ChildProps = React.HTMLAttributes<HTMLElement>;

const TextField: NextPage<TextFieldProps> = ({ children, ...props }) => {
  // child
  const child = children
    ? children instanceof String
      ? React.Children.only(children)
      : children
    : '';

  // child classes
  const strClasses = React.isValidElement<ChildProps>(child)
    ? child.props.className || ''
    : '';
  const childClassNames = strClasses.split(/\s+/);
  childClassNames.push('label-text-alt');

  return (
    <div className="form-control">
      <label className="label">
        {React.isValidElement<ChildProps>(child) ? (
          React.cloneElement(child, { className: childClassNames.join(' ') })
        ) : (
          <span className="label-text-alt">{child}</span>
        )}
      </label>
      {React.createElement<React.InputHTMLAttributes<HTMLInputElement>>(
        'input',
        { ...props, className: getClasses(props) }
      )}
      <label className="label">
        {props.helper && <span className="label-text-alt">{props.helper}</span>}
        <span className="label-text-alt text-error">{props.error}</span>
      </label>
    </div>
  );
};

export default TextField;