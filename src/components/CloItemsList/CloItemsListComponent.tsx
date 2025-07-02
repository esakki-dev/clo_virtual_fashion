import React from 'react';
import './clo-items-list-component.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux-store/store';
import type { CLOFashionItemTypes } from '../../types/CLOFashionItemListTypes';
import { PricingObject } from '../../utils/constant.data';

const CloItemsListComponent: React.FC = () => {

    const cloItems = useSelector((state: RootState) => state.cloItems.cloFilterItems);

    return (
        <div className='clo_items_box' >
            {
                (cloItems as CLOFashionItemTypes[]).map((itemsList: CLOFashionItemTypes) => (
                    <div className='items_list_box' key={itemsList.id}>
                        <img className='item_thumb' src={itemsList.imagePath} alt={itemsList.id} />
                        <div className='item_content_box'>
                            <p className='item_create_name'>{itemsList.creator}</p>
                            <p className='item_title'>{itemsList.title}</p>
                            <p className='item_price'>{itemsList.pricingOption == 0 ? `$ ${itemsList.price.toFixed(2)}` : PricingObject[itemsList.pricingOption]}</p>
                        </div>
                    </div>

                ))
            }
        </div>
    );
};

export default CloItemsListComponent;