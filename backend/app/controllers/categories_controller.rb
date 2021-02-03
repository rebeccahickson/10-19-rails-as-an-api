class CategoriesController < ApplicationController
    def index 
        categories = Category.all 
         options = {include: [:items]}
        render json: CategorySerializer.new(categories, include: [:items])
    end
end
