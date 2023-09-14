import React, { useEffect, useState} from 'react'
import { MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Body = ({ isClickAdd, setShowSelectTranslateModal, setAddButtonDisableStatus, selectedItem, getFilterData, filterLanguageOptions }) => {
    const history = useHistory();

    const [promoSubject, setPromoSubject] = useState(selectedItem.name);
    
    const [language, setLanguage] = useState([]);
    const [languageOptions, setLanguageOptions] = useState(filterLanguageOptions.filter(l => l.label !== 'EN'));

    useEffect(() => {
        if(language.length === 0){
            setAddButtonDisableStatus(true);
        }else{
            setAddButtonDisableStatus(false);
        }
    }, [language])

    useEffect(() => {
        if(isClickAdd){
            const body = {
                promoSubjectId: selectedItem.id,
                languages: language.map(l => {
                    if(l.label === 'EN'){
                        return {
                            languageId: l.value,
                            language: 'en'
                        }
                    }else if(l.label === 'RU'){
                        return {
                            languageId: l.value,
                            language: 'ru'
                        }
                    }else if(l.label === 'TR'){
                        return {
                            languageId: l.value,
                            language: 'tr'
                        }
                    }else if(l.label === 'AZ'){
                        return {
                            languageId: l.value,
                            language: 'az'
                        }
                    }else if(l.label === 'UZ'){
                        return {
                            languageId: l.value,
                            language: 'uz'
                        }
                    }else if(l.label === 'KZ'){
                        return {
                            languageId: l.value,
                            language: 'kz'
                        }
                    }else if(l.label === 'GE'){
                        return {
                            languageId: l.value,
                            language: 'ge'
                        }
                    }
                }),
                createdBy: localStorage.getItem('userName')
            }

            FetchApiPost('services/Pages/PromoSubject/TranslatePromoSubject', 'POST', body)
                .then(res => {
                    if(res.status === 201){
                        res.json().then(({data}) => {
                            getFilterData();
                            setShowSelectTranslateModal(false);
                        })
                    }else if(res.status === 500 || res.status === 502){
                        history.push('/error-500');
                    }
                })
        }
        
    }, [isClickAdd])

  return (
    <div>
        <div>
            <NewTextArea
                label="promo subject"
                value={promoSubject}
                setValue={setPromoSubject}
                isStar={true}
                width={'100%'}
                placeholder="promo subject"
                disabled={true}
            />
        </div>
        <div>
            <MultipleSelects
                label="language"
                selectedItems={language}
                setSelectedItems={setLanguage}
                options={languageOptions}
                isStar={true}
                width={'100%'}
            />
        </div>
    </div>
  )
}

export default Body