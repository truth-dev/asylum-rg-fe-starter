import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';

import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';

import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';
// url for api endpoint
 const URL = 'https://hrf-asylum-be-b.herokuapp.com/cases';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }
 
    /*
          _                                                                             _
        |                                                                                 |
        |   Example request for once the `/summary` endpoint is up and running:           |
        |                                                                                 |
        |     `${url}/summary?to=2022&from=2015&office=ZLA`                               |
        |                                                                                 |
        |     so in axios we will say:                                                    |
        |                                                                                 |     
        |       axios.get(`${url}/summary`, {                                             |
        |         params: {                                                               |
        |           from: <year_start>,                                                   |
        |           to: <year_end>,                                                       |
        |           office: <office>,       [ <-- this one is optional! when    ]         |
        |         },                        [ querying by `all offices` there's ]         |
        |       })                          [ no `office` param in the query    ]         |
        |                                                                                 |
          _                                                                             _
                                   -- Mack 
    
    */
async function updateStateWithNewData( 
  years, 
  view, 
  office, 
  stateSettingCallback
){


    if (office === 'all' || !office) {
      const fis = await axios .get(`${URL}/fiscalSummary`, {
      
          params: {
            from: years[0],
            to: years[1],
          },
        });
        const cit = await axios.get(`${URL}/citizenshipSummary`, {
        params: {
          from: years[0],
          to: years[1],
        }
        
      });
    
        const twinData = {...fis.data, citizenshipResults: cit.data};
        const fisCit = [];
        fisCit.push(twinData);

      stateSettingCallback(view, office, fisCit);
    } else {
    const fis = await axios.get(`${URL}/fiscalSummary`, {
    
          // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
          params: {
            from: years[0],
            to: years[1],
            office: office,
          },
        });
        const cit = await axios.get(`${URL}/citizenshipSummary`, {
          params: {
            from: years[0],
            to: years[1],
            office: office,
          }
        });
        const twinData = {...fis.data, citizenshipResults: cit.data};
        const fisCit = [];
        fisCit.push(twinData);
       
        stateSettingCallback(view, office,fisCit );
    }
  }
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
