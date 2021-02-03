class ItemsController < ApplicationController

    def index 
        items = Item.all 
       
        render json: ItemSerializer.new(items)
        # render json: items.to_json(except: [:created_at, :updated_at], include: {category: {only: [:name]}})
    end

    def show 
        item = Item.find(params[:id])
        render json: item.to_json(except: [:created_at, :updated_at], include: {category: {only: [:name]}})
    end
end
