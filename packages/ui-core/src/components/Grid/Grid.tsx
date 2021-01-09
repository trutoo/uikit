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
    const base = Array.isArray(columns) ? columns : [];
    return {
      'tu-columns': base[0] || columns, // Reverse to avoid attribute becoming an array
      'tu-columns-sm': columnsSM || base[1],
      'tu-columns-md': columnsMD || base[2],
      'tu-columns-lg': columnsLG || base[3],
      'tu-columns-xl': columnsXL || base[4],
    };
  }

  public render() {
    const { className, children, columns, columnsSM, columnsMD, columnsLG, columnsXL, ...rest } = this.props;
    return (
      <div
        {...this.getColumns(columns, columnsSM, columnsMD, columnsLG, columnsXL)}
        {...rest}
        className={`tu-grid ${className || ''}`}>
        {children}
      </div>
    );
  }
}
