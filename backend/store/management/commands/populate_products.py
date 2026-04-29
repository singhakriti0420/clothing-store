from django.core.management.base import BaseCommand
from store.models import Category, Product


class Command(BaseCommand):
    help = 'Populate database with sample products'

    def handle(self, *args, **options):
        # Clear existing data
        Product.objects.all().delete()
        Category.objects.all().delete()

        # Create categories
        men = Category.objects.create(name="Men", slug="men")
        women = Category.objects.create(name="Women", slug="women")
        oversized = Category.objects.create(name="Oversized", slug="oversized")

        # Create sample products
        products_data = [
            {
                "name": "Classic Black T-Shirt",
                "description": "A timeless black t-shirt perfect for any occasion",
                "price": "29.99",
                "category": men,
            },
            {
                "name": "White Casual Shirt",
                "description": "Comfortable white shirt ideal for casual wear",
                "price": "39.99",
                "category": men,
            },
            {
                "name": "Navy Blue Hoodie",
                "description": "Warm and cozy navy blue hoodie",
                "price": "59.99",
                "category": men,
            },
            {
                "name": "Black Denim Jeans",
                "description": "Premium black denim jeans with perfect fit",
                "price": "79.99",
                "category": men,
            },
            {
                "name": "Women's White T-Shirt",
                "description": "Elegant white t-shirt for women",
                "price": "34.99",
                "category": women,
            },
            {
                "name": "Women's Pink Hoodie",
                "description": "Stylish pink hoodie with comfortable fit",
                "price": "64.99",
                "category": women,
            },
            {
                "name": "Women's Black Dress",
                "description": "Formal black dress perfect for any event",
                "price": "99.99",
                "category": women,
            },
            {
                "name": "Women's Blue Jeans",
                "description": "Classic blue jeans with great comfort",
                "price": "74.99",
                "category": women,
            },
            {
                "name": "Oversized Brown T-Shirt",
                "description": "Large oversized brown t-shirt for a relaxed look",
                "price": "44.99",
                "category": oversized,
            },
            {
                "name": "Oversized Gray Hoodie",
                "description": "Oversized gray hoodie with spacious fit",
                "price": "69.99",
                "category": oversized,
            },
            {
                "name": "Oversized Black Sweater",
                "description": "Large oversized black sweater for comfort",
                "price": "54.99",
                "category": oversized,
            },
            {
                "name": "Oversized Beige Shirt",
                "description": "Oversized beige shirt with relaxed style",
                "price": "49.99",
                "category": oversized,
            },
        ]

        for product_data in products_data:
            Product.objects.create(**product_data)

        self.stdout.write(
            self.style.SUCCESS('Successfully populated database with sample products!')
        )
