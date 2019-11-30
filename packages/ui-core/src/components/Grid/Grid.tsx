import React, { Component, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  columns?: number | number[];
  columnsSM?: number;
  columnsMD?: number;
  columnsLG?: number;
  columnsXL?: number;
}

interface State {}

export default class Grid extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  protected getColumns(
    columns?: number | number[],
    columnsSM?: number,
    columnsMD?: number,
    columnsLG?: number,
    columnsXL?: number,
  ) {
    let base = Array.isArray(columns) ? columns : [];
    return {
      'e-columns': base[0] || columns, // Reverse to avoid attribute becoming an array
      'e-columns-sm': columnsSM || base[1],
      'e-columns-md': columnsMD || base[2],
      'e-columns-lg': columnsLG || base[3],
      'e-columns-xl': columnsXL || base[4],
    };
  }

  public render() {
    const { className, children, columns, columnsSM, columnsMD, columnsLG, columnsXL, ...rest } = this.props;
    return (
      <div
        {...this.getColumns(columns, columnsSM, columnsMD, columnsLG, columnsXL)}
        {...rest}
        className={`e-grid ${className || ''}`}
      >
        {children}
      </div>
    );
  }
}
