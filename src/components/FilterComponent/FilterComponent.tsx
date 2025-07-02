import React, { useEffect, useState } from 'react';
import './filter-component.css';
import { SearchIcon } from '../Svg/SearchIcon';
import { CloseIcon } from '../Svg/CloseIcon';
import { PricingData } from '../../utils/constant.data';
import { ResetIcon } from '../Svg/ResetIcon';
import type { PricingTypes } from '../../types/PricingTypes';
import { GetCLOFashionItems } from '../../api-service/get-all-items';
import { useDispatch } from 'react-redux';
import { allClodItems, priceFilterCloItems, setSearchCloItem } from '../../redux-store/clo-items.slice';
import { useNavigate, useLocation } from 'react-router-dom';

const FilterComponent: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [searchItem, setSearchItem] = useState<string>(queryParams.get('search') || '');
    const [selectedOptions, setSelectedOptions] = useState<PricingTypes[]>(PricingData);
    const GetAllItemsApiUrl = " https://closet-recruiting-api.azurewebsites.net/api/data";

    useEffect(() => {
        GetCLOFashionItems(GetAllItemsApiUrl, (response) => {
            dispatch(allClodItems(response));
            dispatch(setSearchCloItem(searchItem));
            updateQueryState();
        });
    }, []);

    const updateQueryState = () => {
        const pricesFromURL = queryParams.get('price')?.split(',').map(Number) || [];

        const updatedpricingOption = selectedOptions.map(opt => ({
            ...opt,
            checked: pricesFromURL.includes(opt.value),
        }))

        setSelectedOptions(updatedpricingOption);
        dispatch(priceFilterCloItems(updatedpricingOption as PricingTypes[]));
    }

    const handleSearchItems = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(event?.target?.value);
        dispatch(setSearchCloItem(event?.target.value));
        dispatch(priceFilterCloItems(selectedOptions as PricingTypes[]));
        updateURL(event?.target?.value, selectedOptions);
    }

    const updateURL = (searchTerm: string, pricing: PricingTypes[]) => {
        const query = new URLSearchParams();

        if (searchTerm.trim()) query.set('search', searchTerm.trim());

        const selectedPrices = pricing.filter(p => p.checked).map(p => p.value);
        if (selectedPrices.length > 0) query.set('price', selectedPrices.join(','));

        navigate({ search: query.toString() }, { replace: true });
    };


    const handlePricingOption = (index: number) => {
        const updatedData = selectedOptions.map((item, i) => i === index ? { ...item, checked: !item.checked } : item)
        setSelectedOptions(updatedData);
        dispatch(priceFilterCloItems(updatedData));
        updateURL(searchItem, updatedData);
    }

    const clearPricingOptionFilter = () => {
        setSelectedOptions(PricingData);
        updateURL(searchItem, PricingData)
        dispatch(priceFilterCloItems(PricingData));
    }

    const clearSearchItem = () => {
        setSearchItem("");
        dispatch(setSearchCloItem(""));
        updateURL("", selectedOptions)
        dispatch(priceFilterCloItems(selectedOptions as PricingTypes[]));
    }

    return (
        <div className='filter_box'>
            <div className='flex_box'>

                <div className='search_item_box'>
                    <span className='search_icon'>
                        <SearchIcon />
                    </span>
                    <input type='text'
                        name='search_items'
                        className='search_items_input'
                        value={searchItem}
                        onChange={handleSearchItems}
                        placeholder="Find the items you're looking for"
                    />
                    {searchItem?.length > 0 &&
                        <span className='clear_icon' onClick={clearSearchItem}>
                            <CloseIcon />
                        </span>
                    }
                </div>

                <div className={`pricing_option_box ${selectedOptions?.some((list) => list.checked) ? 'pricing_option_active' : ''}`}>
                    <div className='left_box'>
                        <label className='pricing_option_title'>Pricing Option</label>
                        {
                            selectedOptions.map((list, index) => (
                                <div className='checkbox_list' key={index}>
                                    <input type='checkbox' id={`${index}`} onChange={() => handlePricingOption(index)} checked={list.checked} name={list.name} value={list.value} />
                                    <label className="pricing_checkbox_label" htmlFor={`${index}`}>{list.name}</label>
                                </div>
                            ))
                        }
                    </div>
                    {selectedOptions?.some((list) => list.checked) &&
                        <span className='reset_pricing_filter' onClick={clearPricingOptionFilter}>
                            <ResetIcon />
                            RESET
                        </span>
                    }
                </div>
            </div>
        </div>
    );
};

export default FilterComponent;