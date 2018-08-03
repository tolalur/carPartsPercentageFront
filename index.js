import { h, app } from "hyperapp"
import { DetailsTable } from "./table"
import { AutoDoc } from "./autodoc"
import * as axios from "axios"

const state = {
    searchString: '',
    generalSearch: {
        autodoc: [],
        exist: []
    },
    tableData: [],
};

const actions = {
    getState: () => state => state,
    setDetailNumber: value => ({ searchString: value }),
    generalSearch: () => (state, actions)  => {
        axios.get(`/api/general/${state.searchString}`)
            .then(function (response) {
                console.log(response.data);
                if (response.data) {
                    actions.setGeneralSearch(response.data);
                }                
            })
            .catch(function (error) {
                console.log(error);
            })
    },
    setGeneralSearch: val => state => ({ generalSearch: val }),
    targetSearch: () => state => {
        axios.get(`/api/target/${state.searchString}`)
            .then(function (response) {
                // handle success
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            
        return { tableData: [1,2] }
    }
};

const view = (state, actions) => (
    <div class="container">
        <div class="row">
            <h3>Сравнение цен на автозапчасти</h3>
        </div>
        <div class="row">
            <div class="row">
                <div class="twelve columns">
                    <label for="detailNumber">Введите номер детали</label>
                    <input class="u-full-width" type="email" id="detailNumber" 
                        oninput={e => actions.setDetailNumber(e.target.value)} />
                </div>
            </div>
            <input class="button-primary" type="submit" value="Поиск" onclick={() => actions.generalSearch()} />
        </div>
        <div class="row">
            {state.generalSearch.autodoc && state.generalSearch.autodoc.length > 0 ? 
            <AutoDoc tableData={state.generalSearch.autodoc} /> 
            : ''}
            {state.generalSearch.autodoc === null ? 
            <AutoDoc tableData={null} /> 
            : ''}
            
        </div>
        {/* <div class="row">
            <DetailsTable tableData={state.tableData} />
        </div> */}
    </div>
)

app(state, actions, view, document.body);