import { Request, Response } from "express";
import Category from "../category/category.model";
import User from "../user/user.model";
import Item from "../items/item.model";

export const getMenu = async (req: Request, res: Response) => {
  try {
    const { restrauntName } = req.query as { restrauntName: string };
    if (!restrauntName) {
      return res.status(401).json({ error: "No Restraunt Found" });
    }
    const resEmail = await User.findOne({
      restrauntName: { $regex: `^${restrauntName.trim()}$`, $options: "i" },
    });

    if (!resEmail) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const categories = await Category.find({ userEmail: resEmail.email });

    const menu = await Promise.all(
      categories.map(async (category) => {
        const items = await Item.find({
          category: category._id,
        });
        
        return {
          category: category.name,
          items: items.map((item) => ({
            _id: item._id,
            name: item.name,
            price: item.price,
            description: item.description,
            image: item.image,
            showInMenu: item.showInMenu,
          })),
        };
      }),
    );

    return res.status(200).json({
      restaurant: {
        name: resEmail.restrauntName,
        photoURL: resEmail.photoURL,
        itemImageEnabled: resEmail.itemImageEnabled,
        colors: resEmail.colors,
      },
      menu
    });
  } catch (error: any) {
    console.error("Error fetching menu:", error);
    return res.status(500).json({ error: "Failed to fetch menu" });
  }
};
