import Site from '../models/siteModel.js';

export const createSite = async (req, res) => {
  try {
    const { description, createdBy } = req.body;
    const images = req.files.map(file => ({
      data: file.buffer,
      contentType: file.mimetype
    }));

    const site = new Site({ description, images, createdBy });
    await site.save();
    res.status(201).json(site);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSites = async (req, res) => {
  try {
    const sites = await Site.find().populate({
      path: 'createdBy',
      select: 'name' // Only fetch the name field
    });

    // Convert Buffers to base64 strings for the client and include description and createdBy
    const sitesWithDetails = sites.map(site => ({
      _id: site._id,
      description: site.description,
      createdBy: site.createdBy ? site.createdBy.name : null, // Check if createdBy exists
      images: site.images.map(image => ({
        data: `data:${image.contentType};base64,${image.data.toString('base64')}`,
        description: image.description,
        createdBy: site.createdBy ? site.createdBy.name : null // Check if createdBy exists
      })),
    }));

    res.json(sitesWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getSitesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const sites = await Site.find({ createdBy: userId }).populate('createdBy', 'name'); // Make sure to fetch the name

    // Convert Buffers to base64 strings for the client and include description and createdBy
    const sitesWithDetails = sites.map(site => ({
      _id: site._id,
      description: site.description,
      createdBy: site.createdBy,
      images: site.images.map(image => ({
        data: `data:${image.contentType};base64,${image.data.toString('base64')}`,
        description: image.description,
        createdBy: site.createdBy.name // Assuming there is a name field in the createdBy document
      })),
    }));

    res.json(sitesWithDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
