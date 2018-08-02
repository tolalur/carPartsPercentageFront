import { h, app } from "hyperapp"
import { DetailsTable } from "./table"
import * as axios from "axios"

const state = {
    detailNumber: '',
    tableData: [],
};

const actions = {
    getState: () => state => state,
    setDetailNumber: value => ({ detailNumber: value }),
    getData: () => state => {
        axios.get(`/api/${state.detailNumber}`)
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
            <input class="button-primary" type="submit" value="Отправить" onclick={() => actions.getData()} />
        </div>
        <div class="row">
            <DetailsTable tableData={state.tableData} />
        </div>
    </div>
)

app(state, actions, view, document.body);