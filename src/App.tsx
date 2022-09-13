import React from 'react';
import './App.css';
import ReactDataSheet from 'react-datasheet';
import './styles.css';
import { Paper } from '@mui/material';
import { ILabelStyles, IStackTokens, IStyleSet, Label, Pivot, PivotItem, PrimaryButton, Stack } from '@fluentui/react';
import SelectEditor from './Select';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { LatViewer, LongViewer } from './FillViewer';

initializeIcons();
const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

const stackTokens: IStackTokens = { childrenGap: 10 };

function App() {

  const [grid, setGrid] = React.useState<any[]>([
  ]);


  React.useEffect(
    () => {
      // default 10 rows for demo
      let temp = Array.from(Array(10).keys()).map(
        x => {
          return [
            { value: '' },
            { value: '', dataEditor: SelectEditor },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '', valueViewer: LatViewer },
            { value: '', valueViewer: LongViewer }
          ]
        }
      );

      //table 
      setGrid([
        [{ readOnly: true, value: 'Universal Mill List (UML) ID number' },
        { readOnly: true, value: 'Parent Company Name of Estates/Smallolder' },
        { readOnly: true, value: 'Name of Estate/Smallholder' },
        { readOnly: true, value: 'Estimated Percentage of FFB Input to Mill from Estate/Smallholder' },
        { readOnly: true, value: 'Name of intermediate dealer/Cooperasi (If applicable). Blank if direct supply rom estates /smallholders' },
        { readOnly: true, value: 'Type of Boundary' },
        { readOnly: true, value: 'Area (ha)' },
        { readOnly: true, value: 'RSPO Certified? (Y/N)' },
        { readOnly: true, value: 'Latitude (Decimal Degree)' },
        { readOnly: true, value: 'Longitude (Decimal Degree)' },
        ], ...temp]);
    }, []
  );


  return (
    <div style={{ width: "100%", padding: "30px", boxSizing: "border-box" }}>
      <Paper elevation={3} style={{ padding: "30px" }}>

        <Pivot defaultSelectedKey='k6' aria-label="Basic Pivot Example">
          <PivotItem
            headerText="MENU (TIER 0)"
            headerButtonProps={{
              'data-order': 1,
              'data-title': 'My Files Title',
            }}
          >
            ABC
          </PivotItem>
          <PivotItem headerText="TIER 1">
            <Label styles={labelStyles}>Pivot #2</Label>
          </PivotItem>
          <PivotItem headerText="TIER 2 - EMPTY">
            <Label styles={labelStyles}>Pivot #3</Label>
          </PivotItem>
          <PivotItem headerText="TIER 3">
            <Label styles={labelStyles}>Pivot #3</Label>
          </PivotItem>
          <PivotItem headerText="TIER 4">
            <Label styles={labelStyles}>Pivot #3</Label>
          </PivotItem>
          <PivotItem headerText="TIER 5">
            <Label styles={labelStyles}>Pivot #3</Label>
          </PivotItem>
          <PivotItem itemKey={"k6"} headerText="TIER 6" >
            <div className='sheet-container' style={{ width: "100%", height: "80vh", paddingTop: "10px" }}>
              <ReactDataSheet
                data={grid}
                valueRenderer={(cell: any) => cell.value}
                onCellsChanged={(changes, arrayOfAdditions) => {
                  const tempGrid = grid.map(row => [...row]);
                  let tempGrid2: any[][] = [];
                  changes.forEach(({ cell, row, col, value }) => {
                    tempGrid[row][col] = { ...tempGrid[row][col], value };
                  });
                  if (arrayOfAdditions) {
                    let currentRow = 0;
                    let temp: any[] = [];
                    arrayOfAdditions.forEach(({ row, col, value }) => {
                      if (currentRow != row) {
                        if (currentRow != 0) {
                          tempGrid2.push(temp);
                        }
                        temp = [];
                        currentRow = row;
                      }
                      //need dynamic, now hard code for column index :)
                      temp.push(col == 1 ? {
                        value: value,
                        dataEditor: SelectEditor
                      } :
                        col == 8 || col == 9 ?
                          {
                            value: value,
                            valueViewer: col == 8 ? LatViewer : LongViewer
                          } :
                          {
                            value: value
                          });

                    });
                  }
                  setGrid([...tempGrid, ...tempGrid2]);
                }}
              />
            </div>
            <Stack horizontal tokens={stackTokens}>
              <PrimaryButton onClick={() => {
                alert("save data:" + JSON.stringify(grid));
                console.log("grid", grid);
              }} text="Save" />
            </Stack>
          </PivotItem>
        </Pivot>

      </Paper>
    </div>
  );
}

export default App;
