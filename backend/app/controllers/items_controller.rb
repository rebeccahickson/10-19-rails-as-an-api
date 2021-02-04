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

    def create 
        item = Item.new(item_params)
        item.category = Category.last  ## NEEDS TO CHANGE!!!!
        if item.save 
            render json: ItemSerializer.new(item)
        else
            render json: {error: "could not save"}
        end
    end

    def destroy 
        item = Item.find(params[:id])
        item.destroy 
        render json: {message: "successfully deleted #{item.name}"}
    end

    private 

    def item_params
        params.require(:item).permit(:price, :description, :name)
    end
end
